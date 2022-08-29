const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('../database/config.db');

class Server {
	constructor() {
		this.app = express();
		this.PORT = process.env.PORT;
		this.gatewayRoute = '/api/gateways';

		//Connect to DB
		this.connectDB();

		//Middlewares
		this.middlewares();

		//Routes
		this.routes();
	}

	connectDB() {
		dbConnection();
	}

	middlewares() {
		//CORS
		this.app.use(cors());

		//Read and parse JSON
		this.app.use(express.json());

		//Public directory
		this.app.use(express.static(path.resolve(__dirname, '../public')));
	}

	routes() {
		this.app.use(this.gatewayRoute, require('../routes/gateway.routes'));
	}

	listen() {
		this.app.listen(this.PORT, () => {
			console.log(`Servidor corriendo en el puerto ${this.PORT}`);
		});
	}
}

module.exports = Server;
