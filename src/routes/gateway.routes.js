const router = require('express').Router();
const { check } = require('express-validator');
const gatewayController = require('../controllers/gateway.controller');
const { validateFields } = require('../middlewares/validate-fields.middleware');
const {
	validatePeripherals,
	checkIfSerialExists,
	checkIfGatewayExists,
} = require('../helpers/validators');

router
	.get('/', gatewayController.getAll)
	.get(
		'/:gatewayID',
		[
			check('gatewayID', 'The ID is not valid').isMongoId(),
			check('gatewayID').custom(checkIfGatewayExists),
			validateFields,
		],
		gatewayController.getOne
	)
	.post(
		'/',
		[
			check('serial', 'The serial number is required').not().isEmpty(),
			check('serial').custom(checkIfSerialExists),
			check('name', 'The name is required').not().isEmpty(),
			check('address', 'The address is not a valid.').not().isEmpty().isIP(),
			check(
				'peripherals',
				'A gateway cannot have more than 10 peripherals.'
			).isArray({ min: 0, max: 10 }),
			check('peripherals').custom(validatePeripherals),
			validateFields,
		],
		gatewayController.create
	)
	.post('/:gatewayID/peripherals', gatewayController.addPeripheral)
	.delete(
		'/:gatewayID/peripherals/:peripheralID',

		gatewayController.deletePeripheral
	);

module.exports = router;
