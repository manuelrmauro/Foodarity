const { check } = require('express-validator');

const ValidationCompany = {
  create: [
    check('name', 'Ingrese el nombre completo').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
    check('description', 'Ingrese una descripcion').not().isEmpty(),
    check('areaCode', 'Ingrese un codigo de area valido').isNumeric(),
    check('phone', 'Ingrese un numero').isNumeric(), // TODO como validar bien numeros de telefono
    check('street', 'Ingrese una direccion').not().isEmpty(),
    check('number', 'Ingrese una altura').isNumeric(),
    check('zipcode', 'Ingrese un codigo postal valido').isNumeric(),
    check('cityId', 'ingrese ID de city').isNumeric(),
    check('stateId', 'Ingrese ID de state').isNumeric(),
  ],
  update: [
    check('name', 'Ingrese el nombre completo').not().isEmpty(),
    check('email', 'Agrega un email válido').isEmail(),
    check('description', 'Ingrese una descripcion').not().isEmpty(),
    check('areaCode', 'Ingrese un codigo de area valido').isNumeric(),
    check('phone', 'Ingrese un numero').isNumeric(), // TODO como validar bien numeros de telefono
    check('street', 'Ingrese una direccion').not().isEmpty(),
    check('number', 'Ingrese una altura').isNumeric(),
    check('zipcode', 'Ingrese un codigo postal valido').isNumeric(),
  ]
};

module.exports = ValidationCompany;
