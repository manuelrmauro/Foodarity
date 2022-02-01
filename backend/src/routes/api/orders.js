const { Router } = require('express');

const router = new Router();
const validationOrder = require('../../middlewares/validations/validationOrder');
const authMiddleware = require('../../middlewares/auth');
const {
  getOrdersByUser,
  getOrdersByCompany,
  postOrder,
  concreteOrder,
} = require('../../controllers/ordersController');

router.get('/user', authMiddleware, getOrdersByUser);
router.get('/company', authMiddleware, getOrdersByCompany);
router.post('/', authMiddleware, validationOrder.post, postOrder);
router.put('/:orderId', authMiddleware, validationOrder.post, concreteOrder);

module.exports = router;
