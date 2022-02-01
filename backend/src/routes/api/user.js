const { Router } = require('express');

const router = new Router();
const {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  uploadPhotoUser,
  validate,
  updatePassword,
} = require('../../controllers/userController');
const { confirmarMail } = require('../../controllers/nodemailerController');
const ValidationsUser = require('../../middlewares/validations/validationUser');
const validationFiles = require('../../middlewares/validations/validationFiles');
const authMiddleware = require('../../middlewares/auth');

const {
  enviarMail,
  resetPassword,
} = require('../../controllers/nodemailerController');

router.post('/nodemailer', enviarMail);
router.post('/', ValidationsUser.withPassword, createUser);
router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUser);
router.delete('/:id', authMiddleware, deleteUser);
router.put('/:id', authMiddleware, ValidationsUser.withoutPassword, updateUser);
router.patch(
  '/upload',
  authMiddleware,
  validationFiles.fileExists,
  uploadPhotoUser
);
router.post('/validate/:id/:usercode', validate);
router.post('/validate/', confirmarMail);
router.post('/reset/', resetPassword);
router.post('/updatepassword/', updatePassword);

module.exports = router;
