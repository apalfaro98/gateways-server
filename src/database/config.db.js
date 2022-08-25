const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGO_CNN)

        console.log('DATABASE ONLINE');

    } catch (error) {
        console.log(error);
        throw new Error('DATABSE OFFLINE');
    }
}

module.exports = {
    dbConnection
};