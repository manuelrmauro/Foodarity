const { Op } = require('sequelize');
const Product = require('../../models/Product');
const Order = require('../../models/Order');
const PaymentMethod = require('../../models/PaymentMethod');
const User = require('../../models/User');
const Company = require('../../models/Company');

const include = [
  {
    model: Company,
    as: 'company',
    attributes: { exclude: ['createdAt', 'updatedAt', 'CompanyTypeId'] },
  },
  {
    model: User,
    as: 'buyer',
    attributes: {
      exclude: [
        'createdAt',
        'updatedAt',
        'password',
        'CompanyId',
        'RoleId',
        'role_id',
      ],
    },
  },
  {
    model: PaymentMethod,
    as: 'paymentMethod',
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'OrderId', 'orderId'],
    },
  },
];

const attributes = {
  exclude: [
    'createdAt',
    'updatedAt',
    'UserId',
    'ProductId',
    'buyerId',
    'CompanyId',
    'productId',
    'PaymentMethodId',
    'paymentMethodId',
    'companyId',
  ],
};

const getOrders = async (request, response) => {
  const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  };

  const { page, size, search } = request.query;

  const { limit, offset } = getPagination(page, size);

  const orderAttr = [['id', 'DESC']];

  try {
    let orders = [];
    if (!search) {
      orders = await Order.findAndCountAll({
        include,
        attributes,
        orderAttr,
        offset,
        limit,
      });
    } else {
      const users = await User.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } },
          ],
        },
      }).then((res) => res.map((user) => user.id));
      const companies = await Company.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { email: { [Op.iLike]: `%${search}%` } },
          ],
        },
      }).then((res) => res.map((company) => company.id));
      orders = await Order.findAndCountAll({
        include,
        where: {
          [Op.or]: [{ buyer_id: users }, { company_id: companies }],
        },
        attributes,
        orderAttr,
        offset,
        limit,
      });
    }
    const ids = [];
    orders.rows.forEach((order) => {
      order.quantityByProduct.forEach((item) => {
        if (!ids.includes(item.product_id)) {
          ids.push(item.product_id);
        }
      });
    });
    const products = await Product.findAll({
      where: { id: ids },
    });

    const finalOrders = orders.rows.map((order) => {
      const finalOrder = order;
      finalOrder.quantityByProduct = order.quantityByProduct.map((item) => {
        const finalItem = item;
        finalItem.product = products.find(
          (producto) => producto.id === item.product_id
        );
        return finalItem;
      });
      return finalOrder;
    });
    return response.status(200).json({
      orders: finalOrders,
      totalOrders: orders.count,
      size: limit,
      page: offset,
      totalPages: Math.ceil(orders.count / limit),
    });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server error' });
  }
};

const getTotalPrice = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include,
      attributes,
      where: {status : 'pagado'}
    });
   
    const ids = [];
    orders.forEach((order) => {
      order.quantityByProduct.forEach((item) => {
        if (!ids.includes(item.product_id)) {
          ids.push(item.product_id);
        }
      });
    });
    const products = await Product.findAll({
      where: { id: ids },
    });
    
    const finalOrders = orders.map((order) => {
      const finalOrder = order;
      finalOrder.quantityByProduct = order.quantityByProduct.map((item) => {
        const finalItem = item;
        finalItem.product = products.find(
          (producto) => producto.id === item.product_id
        );
        return finalItem;
      });
      return finalOrder;
    });

         const sum = finalOrders.map((order) =>
        order.quantityByProduct
        .map((item) => item.product.price * item.quantity)
        .reduce((a, b) => a + b)
        ).reduce((a,b) => a+b)
       return  res.status(200).json(sum) 
  } catch (error) {
    return res.status(200).json(0);
  }
};

module.exports = {
  getOrders,
  getTotalPrice
};
