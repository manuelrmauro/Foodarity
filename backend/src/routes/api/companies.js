const { Router } = require('express');

const router = new Router();

const ValidationCompany = require('../../middlewares/validations/validationCompany');
const validationFiles = require('../../middlewares/validations/validationFiles');
const authMiddleware = require('../../middlewares/auth');

const {
  getCompanies,
  createCompany,
  searchCompany,
  uploadImageCompany,
  deleteCompany,
  updateCompany,
  searchCompanyByUser,
  addUser,
  deleteUser,
  getUsers,
  getAllOngs,
} = require('../../controllers/companiesController');

router.get('/', getCompanies);
router.get('/id/:id', searchCompany);
router.get('/byuser', authMiddleware, searchCompanyByUser);
router.post('/', authMiddleware, ValidationCompany.create, createCompany);
router.patch(
  '/:id/upload/:field',
  authMiddleware,
  validationFiles.fileExists,
  uploadImageCompany
);
router.delete('/disabled/:id', authMiddleware, deleteCompany);
router.put('/:id', authMiddleware, ValidationCompany.update, updateCompany);
router.post('/user', authMiddleware, addUser);
router.delete('/user/:id', authMiddleware, deleteUser);
router.get('/users', authMiddleware, getUsers);
router.get('/ongs', getAllOngs);

module.exports = router;
