const { Router } = require('express');

const router = new Router();


const validationFiles = require('../../middlewares/validations/validationFiles');
const authMiddleware = require('../../middlewares/auth');

const {
  postDonation,
  getDonationsByOng,
  getDonationsByCommerce,
} = require('../../controllers/donationController');

router.post('/:ongId',authMiddleware, validationFiles.fileExists, postDonation);
router.get('/', authMiddleware, getDonationsByOng);
router.get('/commerce', authMiddleware, getDonationsByCommerce);

module.exports = router;
