const { response, request } = require('express');
const { validationResult } = require('express-validator');

const validatePeripherals = (peripherals) => {
	peripherals.forEach((peripheral) => {
		if (!peripheral.vendor) {
			throw new Error('The vendor is required for each peripheral.');
		}
		if (!['online', 'offline'].includes(peripheral.status)) {
			throw new Error('The status must be online or offline.');
		}
	});
	return true;
};

const validateFields = (req = request, res = response, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json(errors);

	next();
};

module.exports = {
	validateFields,
	validatePeripherals,
};
