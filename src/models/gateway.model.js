const { Schema, model } = require('mongoose');

const gatewaySchema = Schema({
    serial: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    peripherals: [{
        type: Schema.Types.ObjectId,
        ref: 'Peripheral'
    }],
});

module.exports = model('Gateway', gatewaySchema);