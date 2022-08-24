const { Schema, model } = require('mongoose');

const peripheralSchema = Schema({
    vendor: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'offline',
        enum: ['online', 'offline']
    }
});

module.exports = model('Peripheral', peripheralSchema);