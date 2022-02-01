const { Router } = require('express');

const router = new Router();
const { getStates } = require('../../controllers/locationsController');

router.get('/', getStates);

module.exports = router;
