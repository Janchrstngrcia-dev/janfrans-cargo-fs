const mongoose = require( 'mongoose' );

const expressSchema = new mongoose.Schema( {
    expressName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
} );

module.exports = mongoose.model( 'Express', expressSchema );