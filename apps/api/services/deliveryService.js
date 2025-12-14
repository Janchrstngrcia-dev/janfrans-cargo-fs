const Delivery = require('../models/Deliveries');

exports.createDeliveryService = async (deliveryData) => {
    const delivery = await Delivery.create({
        trackingNo: deliveryData.trackingNo,
        shipperName: deliveryData.shipperName,
        consigneeName: deliveryData.consigneeName,
        totalAmount: deliveryData.totalAmount,
        payMode: deliveryData.payMode,
        chargeableWeight: deliveryData.chargeableWeight,
        deliveryCategory: deliveryData.deliveryCategory,
        attemptCount: deliveryData.attemptCount || 0,
        status: 'Pending',
        latitude: deliveryData.latitude,
        longitude: deliveryData.longitude,
        remarks: deliveryData.remarks
    });
    return delivery;
};

exports.getAllDeliveriesService = async () => {
    return await Delivery.find().sort({ createdAt: -1 });
};

exports.updateDeliveryStatusService = async (id, status) => {
    const delivery = await Delivery.findByIdAndUpdate(
        id, 
        { status: status, updatedAt: Date.now() }, 
        { new: true }
    );
    if (!delivery) {
        throw new Error('Delivery not found');
    }
    return delivery;
};
exports.deleteDeliveryService = async (id) => {
    return await Delivery.findByIdAndDelete(id);
};

exports.getDeliveryByTrackingNoService = async (trackingNo) => {
    return await Delivery.findOne({ trackingNo });
};