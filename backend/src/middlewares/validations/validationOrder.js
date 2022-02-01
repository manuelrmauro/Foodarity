const { check } = require('express-validator');

const ValidationOrder = {
  post: [
    check('quantity', 'Ingrese cantidad').isNumeric(),
    check('date', 'Ingrese fecha de posteo').isDate(),
    check('paymentMethod', 'Ingrese categoria').isNumeric(),
  ],
};

module.exports = ValidationOrder;
