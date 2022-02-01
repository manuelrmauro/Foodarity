const { Router } = require('express');
const authMiddleware = require('../../middlewares/auth');

const router = new Router();

const {
  getCart,
  addToCart,
  removeInCart,
  clearCart,
} = require('../../controllers/cartController');

router.get('/', authMiddleware, getCart);
router.post('/', authMiddleware, addToCart);
router.delete('/', authMiddleware, removeInCart);
router.put('/clear', authMiddleware, clearCart);

module.exports = router;
