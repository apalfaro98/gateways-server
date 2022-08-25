const router = require('express').Router();
const gatewayController = require('../controllers/gateway.controllers');

router.get('/', gatewayController)
      .get('/:gatewayID', gatewayController)
      .post('/', gatewayController)
      .post('/:gatewayID/peripherals', gatewayController)
      .delete('/:gatewayID/peripherals/:peripheralID', gatewayController);

module.exports = router;