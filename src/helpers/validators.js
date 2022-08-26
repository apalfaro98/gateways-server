const Gateway = require('../models/gateway.model');

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

const checkIfSerialExists = async (serial = '') => {
	const serialExists = await Gateway.findOne({ serial });

	if (serialExists) {
		throw new Error('The serial number already exists in the database');
	}
};

module.exports = {
	validatePeripherals,
	checkIfSerialExists,
};
