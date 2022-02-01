const { Op } = require('sequelize');
const cloudinary = require('cloudinary').v2;
const Category = require('../../models/Category');
const Product = require('../../models/Product');
const User = require('../../models/User');
const Company = require('../../models/Company');
const Address = require('../../models/Address');
const State = require('../../models/State');
const City = require('../../models/City');

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

const getProducts = async (request, response) => {
  const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
  };

  const { page, size, search } = request.query;

  const { limit, offset } = getPagination(page, size);

  const orderAttr = [['id', 'DESC']];

  try {
    if (!search) {
      const products = await Product.findAndCountAll({
        include,
        order: orderAttr,
        attributes,
        offset,
        limit,
      });
      return response.status(200).json({
        products: products.rows,
        totalProducts: products.count,
        size: limit,
        page: offset,
        totalPages: Math.ceil(products.count / limit),
      });
    }

    const products = await Product.findAndCountAll({
      include,
      where: {
        [Op.or]: [
          { lote: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
        ],
      },
      order: orderAttr,
      attributes,
      offset,
      limit,
    });

    return response.status(200).json({
      products: products.rows,
      totalProducts: products.count,
      size: limit,
      page: offset,
      totalPages: Math.ceil(products.count / limit),
    });
  } catch (error) {
    return response.status(500).json({ message: 'Internal Server error' });
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

const uploadImageProduct = async (request, response) => {
  const { id } = request.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return response.status(400).json({
        message: 'Product not found',
      });
    }

    const { tempFilePath } = request.files.file;

    if (product.photo) {
      cloudinary.uploader.destroy(product.photo.public_id);
    }

    const { secure_url: secureUrl, public_id: publicId } =
      await cloudinary.uploader.upload(tempFilePath);

    await product.update({ photo: { public_id: publicId, url: secureUrl } });

    return response
      .status(200)
      .json({ message: 'La imagen se subio correctamente' });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: 'Fatal Error',
    });
  }
};

const updateProduct = async (request, response) => {
  try {
    const { id } = request.params;
    const {
      lote,
      description,
      quantity,
      price,
      publicationDate,
      expirationDate,
      category,
      status,
    } = request.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return response.status(400).send({ message: 'el producto no existe' });
    }

    await product.update({
      lote,
      description,
      quantity,
      totalQuantity: quantity,
      price,
      publicationDate,
      expirationDate,
      status,
    });
    const categoryToUpdate = await Category.findByPk(category.id);
    await product.setCategory(categoryToUpdate);

    return response.status(200).json({ message: 'producto Actualizado' });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: 'Internal Error' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  updateProduct,
  uploadImageProduct,
};
