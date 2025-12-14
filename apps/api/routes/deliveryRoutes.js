const express = require('express');
const router = express.Router();
const {
    createDelivery,
    getDeliveries,
    updateDeliveryStatus,
    deleteDelivery,
    getDeliveryByTrackingNo
} = require('../controllers/deliveryController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getDeliveries);
router.post('/', protect, createDelivery);

router.patch('/:id/status', protect, updateDeliveryStatus);
router.delete('/:id', protect, deleteDelivery);
router.get('/:trackingNo', protect, getDeliveryByTrackingNo);

module.exports = router;