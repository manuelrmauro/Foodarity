const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const router = new Router();

const swaggerDocument = YAML.load('./src/config/swagger.yaml');

const options = {
  customCss: '.swagger-ui .topbar { display: none }',
};

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument, options));

module.exports = router;
