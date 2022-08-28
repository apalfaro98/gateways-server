const { response, request } = require('express');
const { validationResult } = require('express-validator');
const Gateway = require('../models/gateway.model');
const Peripheral = require('../models/peripheral.model');

const checkIfPeripheralExists = async (req = request, res = response, next) => {
	const { gatewayID, peripheralID } = req.params;

	const gateway = await Gateway.findById(gatewayID);

	if (!gateway.peripherals.find((id) => id == peripheralID)) {
		return res.status(400).json({
			value: gatewayID,
			msg: 'The peripheral ID does not exist in the gateway',
			param: 'peripheralID',
			location: 'params',
		});
	}

	next();
};

const validateFields = (req = request, res = response, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json(errors);

	next();
};

module.exports = {
	validateFields,
	checkIfPeripheralExists,
};
