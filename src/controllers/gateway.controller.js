const { response, request } = require('express');
const Peripheral = require('../models/peripheral.model');
const Gateway = require('../models/gateway.model');

const gatewayController = {
	getAll: async (req = request, res = response) => {
		const gateways = await Gateway.find().populate('peripherals', [
			'vendor',
			'created',
			'status',
		]);
		res.json(gateways);
	},
	getOne: (req = request, res = response) => {
		res.json({
			msg: 'One gateway',
		});
	},
	create: async (req = request, res = response) => {
		const { serial, name, address } = req.body;
		let { peripherals } = req.body;

		const pers = await Promise.all(
			peripherals.map((p) => {
				const per = new Peripheral({
					...p,
					created: Date.now(),
				});
				return per.save();
			})
		);

		peripherals = pers.map((el) => el._id);

		const gateway = new Gateway({
			serial,
			name,
			address,
			peripherals,
		});

		await gateway.save();

		res.status(201).json(gateway);
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
