const cloudinary = require('cloudinary').v2;

const { Op } = require('sequelize');
const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');
const Company = require('../models/Company');
const Address = require('../models/Address');
const State = require('../models/State');
const City = require('../models/City');
const Cart = require('../models/Cart');

cloudinary.config(process.env.CLOUDINARY_URL);

const include = [
  {
    model: Category,
    as: 'category',
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  },
  {
    model: Company,
    as: 'company',
    include: [
      {
        model: Address,
        as: 'address',
        include: [
          {
            model: State,
            as: 'state',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
          {
            model: City,
            as: 'city',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'CompanyId', 'addressId'],
        },
      },
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  },
  {
    model: User,
    as: 'publisher',
    attributes: {
      exclude: [
        'phone',
        'createdAt',
        'updatedAt',
        'password',
        'status',
        'CompanyId',
        'RoleId',
        'role_id',
      ],
    },
  },
];
const attributes = {
  exclude: [
    'createdAt',
    'updatedAt',
    'CategoryId',
    'CompanyId',
    'categoryId',
    'companyId',
    'publisherId',
    'UserId',
  ],
};

const getProducts = async (req, res) => {
  try {
    const { lote, categoryName, categoryId, expirationDate, size } = req.query;
    let { minPrice, maxPrice, order } = req.query;
    order = order || 'recents';
    minPrice = parseInt(minPrice, 10) || 0;
    maxPrice = parseInt(maxPrice, 10) || 0;
    const page = parseInt(req.query.page, 10) || 1;
    const whereAttr = { status: 'published' };
    const orderAttr = [['id', 'DESC']];

    switch (order) {
      case 'recents':
        orderAttr.unshift(['id', 'DESC']);
        break;
      case 'priceASC':
        orderAttr.unshift(['price', 'ASC']);
        break;
      case 'priceDESC':
        orderAttr.unshift(['price', 'DESC']);
        break;
      case 'expirationASC':
        orderAttr.unshift(['expirationDate', 'ASC']);
        break;
      case 'expirationDESC':
        orderAttr.unshift(['expirationDate', 'DESC']);
        break;
      default:
        break;
    }
    if (lote) {
      const companies = await Company.findAll({where: {
         name: { [Op.iLike]: `%${lote}%` } },
         }).then(resp => resp.map(company => company.id))
      whereAttr[Op.or] = [
        { lote: { [Op.iLike]: `%${lote}%` } },
        { company_id : companies },
      ]
    }
    // TODO corroborar como buscar por relacion de entidades
    if (categoryName) {
      include[0].where = {
        name: categoryName,
      };
    }
    if (categoryId) {
      include[0].where = {
        id: categoryId,
      };
    }
    if (categoryName === '' || categoryName === 'Todas') {
      delete include[0].where;
    }
    if (minPrice && maxPrice) {
      whereAttr.price = { [Op.between]: [minPrice, maxPrice] };
    } else if (minPrice) {
      whereAttr.price = { [Op.gte]: minPrice };
    } else if (maxPrice) {
      whereAttr.price = { [Op.lte]: maxPrice };
    } else {
      delete whereAttr.price;
    }

    if (expirationDate) {
      whereAttr.expirationDate = { [Op.lte]: expirationDate };
    }
    if (expirationDate === 'clear') {
      delete whereAttr.expirationDate;
    }

    const params = {
      where: whereAttr,
      include,
      order: orderAttr,
      attributes,
    };

    // const allProducts = await Product.findAll(params);
    const allProducts = await Product.findAll(params);

    if (size) {
      params.limit = size;
      params.offset = (page - 1) * size;
      // products = products.slice((page - 1) * size, (page - 1) * size + size);
    }
    const products = await Product.findAll(params);

    const count = await Product.count(params);

    const totalCount = await Product.count(params);
    const pages = Math.ceil(count / size);
    res.status(200).json({
      products,
      allProducts,
      totalProducts: totalCount,
      page: page || 1,
      pages: pages || 1,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const postProduct = async (req, res) => {
  // TODO auth de company que publica y guardar el id
  try {
    const { userId } = req;
    const user = await User.findByPk(userId, {
      include: [{ model: Company, as: 'company' }],
    });
    if (!user.company_id) {
      return res
        .status(401)
        .json({ message: 'El usuaria no posee un comercio' });
    }
    if (user.company.company_type_id !== 1) {
      return res.status(401).json({
        message: 'Solo las companias tipo comercio pueden publicar productos',
      });
    }
    if (user.company.status !== 'Habilitada') {
      return res.status(401).json({
        message: 'Solo los comercios habilitados pueden publicar productos',
      });
    }

    const { tempFilePath } = req.files.file;

    const { secure_url: secureUrl, public_id: publicId } =
      await cloudinary.uploader.upload(tempFilePath);

    const photo = { public_id: publicId, url: secureUrl };

    const {
      lote,
      description,
      quantity,
      price,
      publicationDate,
      expirationDate,
      category,
    } = JSON.parse(req.body.data);
    const newProduct = await Product.create({
      lote,
      description,
      photo,
      quantity,
      totalQuantity: quantity,
      price,
      publicationDate,
      expirationDate,
      status: 'published',
    });
    await newProduct.setCategory(category);
    await newProduct.setCompany(user.company);
    await newProduct.setPublisher(userId);
    return res.status(200).json(newProduct);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const deletePublication = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findByPk(userId, {
      include: [{ model: Company, as: 'company' }],
    });
    const { id } = req.params;
    let product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ msg: 'Not found' });
    }

    if (product.company_id !== user.company_id) {
      return res
        .status(401)
        .json({ message: 'Tu compania no publico este producto' });
    }
    if (product.status !== 'published') {
      return res.status(401).json({
        message: 'No puedes borrar un producto que ya no esta publicado',
      });
    }
    await Product.update(
      {
        status: 'canceled',
      },
      {
        where: { id },
      }
    );
    await Cart.destroy({ where: { product_id: id } });
    product = await Product.findByPk(id);
    return res.status(200).json({ msg: 'success', data: product });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};

const getCompanyProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({ message: 'Not found' });
    }
    const products = await Product.findAll({
      where: { company_id: id, status: 'published' },
      order: [['id', 'DESC']],
      include,
      attributes,
    });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const getCompanyProductsByAuth = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findByPk(userId);
    const id = user.company_id;
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(401).json({ message: 'No posees una compania' });
    }
    if (company.company_type_id !== 1) {
      return res.status(401).json({ message: 'No posees un comercio' });
    }
    const products = await Product.findAll({
      where: { company_id: id },
      order: [['id', 'DESC']],
      include,
      attributes,
    });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include,
      attributes,
    });
    if (!product) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

const getCategories = async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      attributes: ['id', 'name'],
    });
    if (!allCategories) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json(allCategories);
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

module.exports = {
  getProducts,
  postProduct,
  deletePublication,
  getCompanyProductsById,
  getProductById,
  getCompanyProductsByAuth,
  getCategories,
};
