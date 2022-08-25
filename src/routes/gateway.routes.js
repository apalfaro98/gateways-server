const router = require('express').Router();
const gatewayController = require('../controllers/gateway.controller');

router.get('/', gatewayController.getAll)
      .get('/:gatewayID', gatewayController.getOne)
      .post('/', gatewayController.create)
      .post('/:gatewayID/peripherals', gatewayController.addPeripheral)
      .delete('/:gatewayID/peripherals/:peripheralID', gatewayController.deletePeripheral);

module.exports = router;