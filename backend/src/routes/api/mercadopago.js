const { Router } = require('express');

const authMiddleware = require('../../middlewares/auth');

const router = new Router();
const {
  validateCode,
  getUrlRegister,
  createPreference,
  unlinkMercadopago,
} = require('../../controllers/mercadopagoController');

router.post('/register', authMiddleware, validateCode);
router.get('/register', authMiddleware, getUrlRegister);
router.post('/preference', authMiddleware, createPreference);
router.delete('/unlink',authMiddleware, unlinkMercadopago)

module.exports = router;
