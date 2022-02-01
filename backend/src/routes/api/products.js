const { Router } = require('express');

const router = new Router();
const ValidationProduct = require('../../middlewares/validations/validationProduct');
const validationFiles = require('../../middlewares/validations/validationFiles');
const authMiddleware = require('../../middlewares/auth');
const {
  getProducts,
  postProduct,
  deletePublication,
  getProductById,
  getCompanyProductsById,
  getCompanyProductsByAuth,
  getCategories,
} = require('../../controllers/productsController');

router.get('/', getProducts);
router.post(
  '/',
  authMiddleware,
  validationFiles.fileExists,
  ValidationProduct.post,
  postProduct
); // TODO manejar la imagen cloudinary
router.delete('/id/:id', authMiddleware, deletePublication);
router.get('/id/:id', getProductById);
router.get('/company/:id', getCompanyProductsById);
router.get('/byauth', authMiddleware, getCompanyProductsByAuth);
router.get('/categories', getCategories);

module.exports = router;
