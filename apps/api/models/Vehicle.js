const mongoose = require( 'mongoose' );
const vehicleSchema = new mongoose.Schema( {
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
    }
} );

module.exports = mongoose.model( 'Vehicle', vehicleSchema );