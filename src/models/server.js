const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.PORT = process.env.PORT;

        //Middlewares
        this.middlewares();

    }


    middlewares() {

        //CORS
        this.app.use(cors());

        //Read and parse JSON
        this.app.use(express.json());

        //Public directory
        this.app.use(express.static('public'));
    }

    listen() {
        this.app.listen(this.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${this.PORT}`);
        });
    }
}

module.exports = Server;