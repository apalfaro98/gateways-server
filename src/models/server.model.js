const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;
        this.gatewayRoute = '/api/gateways'
        this.peripheralRoute = '/api/peripherals'

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }


    middlewares() {

        //CORS
        this.app.use(cors());

        //Read and parse JSON
        this.app.use(express.json());

        //Public directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.gatewayRoute, require('../routes/gateway.routes'));
        this.app.use(this.gatewayRoute, require('../routes/peripheral.routes'));
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${this.PORT}`);
        });
    }
}

module.exports = Server;