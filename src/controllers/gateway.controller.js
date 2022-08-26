const { response, request } = require('express');

const gatewayController = {
	getAll: (req = request, res = response) => {
		res.json({
			msg: 'All gateways',
		});
	},
	getOne: (req = request, res = response) => {
		res.json({
			msg: 'One gateway',
		});
	},
	create: (req = request, res = response) => {
		res.status(201).json({
			msg: 'Create gateway',
		});
	},
	addPeripheral: (req = request, res = response) => {
		res.json({
			msg: 'Add Peripheral',
		});
	},
	deletePeripheral: (req = request, res = response) => {
		res.json({
			msg: 'Delete peripheral',
		});
	},
};

module.exports = gatewayController;
