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
	getOne: async (req = request, res = response) => {
		const { gatewayID } = req.params;
		const gateway = await Gateway.findById(gatewayID).populate('peripherals', [
			'vendor',
			'created',
			'status',
		]);
		res.json(gateway);
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
	addPeripheral: async (req = request, res = response) => {
		const { gatewayID } = req.params;
		const { vendor, status } = req.body;
		const { peripherals } = await Gateway.findById(gatewayID);
		const peripheral = new Peripheral({
			vendor,
			created: Date.now(),
			status,
		});

		await peripheral.save();

		const gateway = await Gateway.findByIdAndUpdate(
			gatewayID,
			{ peripherals: [...peripherals, peripheral._id] },
			{ new: true }
		);

		res.status(200).json(gateway);
	},
	deletePeripheral: async (req = request, res = response) => {
		const { gatewayID, peripheralID } = req.params;

		await Peripheral.findByIdAndDelete(peripheralID);

		let { peripherals } = await Gateway.findById(gatewayID);
		peripherals = peripherals.filter((id) => id != peripheralID);

		const gateway = await Gateway.findByIdAndUpdate(
			gatewayID,
			{ peripherals },
			{ new: true }
		);

		res.status(200).json(gateway);
	},
};

module.exports = gatewayController;
