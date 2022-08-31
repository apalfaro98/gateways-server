# Gateways API

This is a simple API for manage gateways and their peripherals.

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- Change the extension of the `.env.example` file to `.env` and fill it with the environment variables of ypur choice.
- `npm run dev` to start the local server

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript
- [express-validator](https://github.com/express-validator/express-validator) - For the validation middlewares
- [cors](https://github.com/expressjs/cors) - Enables the CORS in the app
- [dotenv](https://github.com/motdotla/dotenv) - Load environment variable from the .env file.

## Application Structure

- `index.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `database/` - This folder contains the configuration for connecting to the database.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.
- `controllers/` - This folder contains the controllers definitions for our API.
- `middlewares/` - This folder contains some custom middlewares definitions for our API.
- `helpers/` - This folder contains some custom functions definitions.
- `public/` - This folder contains the frontend code that serves express.
