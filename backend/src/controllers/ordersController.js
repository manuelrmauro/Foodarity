/* eslint-disable camelcase */
const { Op } = require('sequelize');
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const Company = require('../models/Company');
const PaymentMethod = require('../models/PaymentMethod');
const Cart = require('../models/Cart');
const {send} = require('./nodemailerController')

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

const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req;
    const orders = await Order.findAll({
      where: { buyer_id: userId },
      include,
      attributes,
      order: [['id', 'DESC']],
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

    return res.status(200).json(finalOrders);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const getOrdersByCompany = async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findByPk(userId, {
      include: [{ model: Company, as: 'company' }],
    });

    if (!user.company_id) {
      return res.status(401).json({ msg: 'El usuaria no posee un comercio' });
    }
    if (user.company.company_type_id !== 1) {
      return res.status(401).json({
        message: 'La compania no es un comercio',
      });
    }
    if (user.company.status !== 'Habilitada') {
      return res.status(401).json({
        message: 'La compania no se encuentra habilitada',
      });
    }
    const orders = await Order.findAll({
      where: { company_id: user.company_id },
      include,
      attributes,
      order: [['id', 'DESC']],
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

    return res.status(200).json(finalOrders);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

const postOrder = async (req, res) => {
  // TODO AGREGAR CHECKEO DE COMPANY y USER
  const { userId } = req;
  const { date, quantityByProduct, paymentMethod, company_id } = req.body;
  try {
    const user = await User.findByPk(userId);
    const company = await Company.findByPk(company_id);

    if (!user.status) {
      return res.json({
        message: 'El usuario esta deshabilitado',
      });
    }
    if (user.deleted) {
      return res.json({
        message: 'El usuario fue borrado',
      });
    }
    if (company.status !== 'Habilitada') {
      return res.json({
        message: 'El comercio no esta habilitado',
      });
    }
    // aca

    const ids = [];

    quantityByProduct.forEach((item) => {
      if (!ids.includes(item.product_id)) {
        ids.push(item.product_id);
      }
    });

    const products = await Product.findAll({ where: { id: ids } });

    const products_ids = [];
    products.forEach((product) => {
      const qBp = quantityByProduct.find(
        (item) => item.product_id === product.id
      );
      if (product.status === 'published' && product.quantity >= qBp.quantity) {
        products_ids.push(product);
      }
    });

    if (ids.length !== products_ids.length) {
      return res.status(400).json({
        message:
          'Alguno de los productos ya no esta publicado, o no tiene suficientes lotes',
      });
    }

    const order = await Order.create({ date, quantityByProduct });
    await order.setCompany(company_id);
    await order.setBuyer(userId);
    await order.setPaymentMethod(paymentMethod);
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const concreteOrder = async (req, res) => {
  const { userId } = req;
  const { orderId } = req.params;
  const { fail } = req.query;
  try {
    const order = await Order.findByPk(orderId);
    if (fail) {
      await order.destroy();
      return res.status(200).json({ message: 'orden fallida' });
    }
    const ids = [];

    order.quantityByProduct.forEach((item) => {
      if (!ids.includes(item.product_id)) {
        ids.push(item.product_id);
      }
    });

    const products = await Product.findAll({ where: { id: ids } });

    products.forEach(async (product) => {
      try {
        const qBp = order.quantityByProduct.find(
          (item) => item.product_id === product.id
        );
        const { product_id, quantity } = qBp;
        const productQuantity = product.quantity;
        // borra el producto del carrito del comprador
        await Cart.destroy({ where: { user_id: userId, product_id } });
        if (productQuantity > quantity) {
          // actualiza la cantidad de los productos publicados
          await Product.update(
            { quantity: productQuantity - quantity },
            { where: { id: product_id } }
          );
          // actualiza la cantidad en los demas carritos que tengan este producto
          await Cart.update(
            { quantity: productQuantity - quantity },
            {
              where: {
                product_id,
                quantity: { [Op.gte]: productQuantity - quantity },
              },
            }
          );
        }
        if (productQuantity === quantity) {
          // finaliza las publicaciones que ya no tienen stock
          await Product.update(
            { quantity: productQuantity - quantity, status: 'finished' },
            { where: { id: product_id } }
          );
          // y las borra de los carritos
          await Cart.destroy({ where: { product_id } });
        }
        return 'producto y carrito actualizado';
      } catch (error) {
        return res.status(500).json({ message: error });
      }
    });
    const user = await User.findByPk(order.buyer_id)
    const company = await Company.findByPk(order.company_id)
    await send(user.email, 'Tu compra fue realizada con exito', `Tu compra a ${company.name} fue exitosa. Te dejamos sus datos para que se puedan ponen en contacto.\n
    web: ${company.website}\n
    email: ${company.email}\n
    telefono: ${company.areaCode} ${company.phone}\n\n
    Podes ver el detalle de tu compra en tu perfil de usuario.`)
    await send(company.email, 'Realizaste una venta!', `Te dejamos los datos de ${user.name} para que se puedan ponen en contacto.\n
    email: ${user.email}\n
    telefono: ${user.phone}\n\n
    Podes ver el detalle de tu venta en tu perfil de comercio.`)
    order.update({ status: 'pagado' });
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  getOrdersByUser,
  getOrdersByCompany,
  postOrder,
  concreteOrder,
};
