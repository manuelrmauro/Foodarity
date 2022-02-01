const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Company = require('../models/Company');
const Address = require('../models/Address');
const State = require('../models/State');
const City = require('../models/City');
const Category = require('../models/Category');

async function getCartProducts(userId) {
  const cart = await Cart.findAll({
    where: { user_id: userId },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      {
        model: Product,
        as: 'product',
        include: [
          { model: Category, as: 'category' },
          {
            model: Company,
            as: 'company',
            include: [
              {
                model: Address,
                as: 'address',
                include: [
                  { model: State, as: 'state' },
                  { model: City, as: 'city' },
                ],
              },
            ],
          },
        ],
      },
    ],
    order: [['product_id', 'ASC']],
  });
  return cart;
}

const getCart = async (req, res) => {
  try {
    const { userId } = req;
    const cart = await getCartProducts(userId);
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
const addToCart = async (req, res) => {
  try {
    const { userId } = req;
    const { pid } = req.query;
    const quantity = parseInt(req.query.quantity, 10);
    if (!pid || !quantity) {
      return res
        .status(401)
        .json({ message: 'Debes ingresar un product id y/o una cantidad' });
    }
    const product = await Product.findByPk(pid);
    if (!product) {
      return res.status(401).json({ message: 'El producto no existe' });
    }
    if (product.status !== 'published') {
      return res
        .status(401)
        .json({ message: 'El producto ya no esta publicado' });
    }
    const cartProduct = await Cart.findOne({
      where: { user_id: userId, product_id: pid },
    });

    if (!cartProduct) {
      if (product.quantity < quantity) {
        return res.status(401).json({
          message: 'El producto no tienen tantos lotes disponibles',
        });
      }
      const finalProduct = await Cart.create({ quantity });
      await finalProduct.setUser(userId);
      await finalProduct.setProduct(pid);
    } else {
      const finalQuantity = cartProduct.quantity + quantity;
      if (product.quantity < finalQuantity) {
        await cartProduct.update({ quantity: product.quantity });
      } else {
        await cartProduct.update({ quantity: finalQuantity });
      }

      if (cartProduct.quantity <= 0) {
        await cartProduct.destroy({ force: true });
      }
    }

    const cart = await getCartProducts(userId);
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
const removeInCart = async (req, res) => {
  try {
    const { userId } = req;
    const { pid } = req.query;
    if (!pid) {
      return res.status(401).json({ message: 'Debes ingresar un product id' });
    }
    await Cart.destroy({ where: { product_id: pid }, force: true });
    const cart = await getCartProducts(userId);
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
const clearCart = async (req, res) => {
  try {
    const { userId } = req;
    await Cart.destroy({ where: { user_id: userId }, force: true });
    const cart = await getCartProducts(userId);
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeInCart,
  clearCart,
};
