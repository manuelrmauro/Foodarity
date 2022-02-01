const { Router } = require('express');

const docsRoutes = require('./docs');
const adminRoutes = require('./admin');
const companiesRoutes = require('./companies');
const userRoutes = require('./user');
const authRoutes = require('./auth');
const authSocialRoutes = require('./authSocial');
const statesRoutes = require('./states');
const citiesRoutes = require('./cities');
const productsRoutes = require('./products');
const donationRoutes = require('./donation');
const ordersRoutes = require('./orders');
const mercadopagoRoutes = require('./mercadopago');
const cartRoutes = require('./cart');

const router = new Router();

// Docs Route
router.use('/docs', docsRoutes);

// Admin Routes
router.use('/admin', adminRoutes);

router.use('/companies', companiesRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/auth/social', authSocialRoutes);
router.use('/states', statesRoutes);
router.use('/cities', citiesRoutes);
router.use('/products', productsRoutes);
router.use('/donation', donationRoutes);
router.use('/orders', ordersRoutes);
router.use('/mercadopago', mercadopagoRoutes);
router.use('/cart', cartRoutes);

module.exports = router;
