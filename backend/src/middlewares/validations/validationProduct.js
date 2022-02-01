const { check } = require('express-validator');

const ValidationProduct = {
  post: [
    check('name', 'Ingrese nombre del producto').not().isEmpty(),
    check('description', 'Ingrese descripcion').not().isEmpty(),
    check('price', 'Ingrese precio').not().isEmpty().isDecimal(),
    check('quantity', 'Ingrese cantidad').isNumeric(),
    check('publicationDate', 'Ingrese fecha de posteo').isDate(),
    check(
      'expirationDate',
      'Ingrese fecha de expiracion del producto'
    ).isDate(),
    check('category', 'Ingrese categoria').isNumeric(),
  ],
};

module.exports = ValidationProduct;
