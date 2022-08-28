const Gateway = require('../models/gateway.model');

const validateVendor = (vendor) => {
	if (!vendor) {
		throw new Error('The vendor is required for each peripheral.');
	}
	return true;
};

const validateStatus = (status) => {
	if (!['online', 'offline'].includes(status)) {
		throw new Error('The status must be online or offline.');
	}
	return true;
};

const validatePeripherals = (peripherals) => {
	peripherals.forEach((peripheral) => {
		validateVendor(peripheral.vendor);
		validateStatus(peripheral.status);
	});
	return true;
};

const checkIfSerialExists = async (serial = '') => {
	const serialExists = await Gateway.findOne({ serial });

	if (serialExists) {
		throw new Error('The serial number already exists in the database');
	}
};

const checkIfGatewayExists = async (id = '') => {
	const gatewayExists = await Gateway.findById(id);

	if (!gatewayExists) {
		throw new Error(`The gateway with the id ${id} does not exists`);
	}
};

const checkIfCanAddPeripheral = async (id) => {
	const gateway = await Gateway.findById(id);
	if (gateway.peripherals.length === 10) {
		throw new Error('This gateway already has 10 peripherals.');
	}
};

module.exports = {
	validatePeripherals,
	checkIfSerialExists,
	checkIfGatewayExists,
	checkIfCanAddPeripheral,
	validateVendor,
	validateStatus,
};
