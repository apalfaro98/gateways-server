require('dotenv').config();

const Server = require('./src/models/server.model');
const server = new Server();

server.listen();