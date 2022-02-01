const { Router } = require('express');

const router = new Router();
const {
  getCities,
  getCitiesByState,
  getCityById,
} = require('../../controllers/locationsController');

router.get('/', getCities);
router.get('/:stateId', getCitiesByState);
router.get('/id/:id', getCityById);

module.exports = router;
