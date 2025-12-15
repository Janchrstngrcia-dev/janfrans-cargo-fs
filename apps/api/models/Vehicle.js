const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleName: {
        type: String,
        required: true,
        trim: true
    },
    plateNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    vehicleType: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'maintenance', 'inactive'],
        default: 'active'
    },
    mileage: {
        type: Number,
        default: 0
    },
    lastService: {
        type: String,
        default: 'N/A'
    }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);