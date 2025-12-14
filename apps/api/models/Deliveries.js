const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    trackingNo: { type: String, required: true, unique: true },
    shipperName: { type: String, required: true },
    consigneeName: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    payMode: { type: String, required: true },
    chargeableWeight: { type: Number, required: true },
    deliveryCategory: { type: String, required: true },
    attemptCount: { type: Number, default: 0 },
    
    // Status 
    status: { type: String, enum: ['Pending', 'In Transit', 'Delivered', 'Cancelled'], default: 'Pending' },
    
    // Geo-location fields
    latitude: { type: Number },
    longitude: { type: Number },
    
    remarks: { type: String },
    estimatedTime: { type: Date },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Delivery', DeliverySchema);