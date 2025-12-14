const DeliveryService = require( '../services/deliveryService' );

exports.createDelivery = async ( req, res ) => {
    try {
        const deliveryData = req.body;
        const newDelivery = await DeliveryService.createDeliveryService( deliveryData );
        res.status( 201 ).json( newDelivery );
    }
    catch ( error ) {
        res.status( 500 ).json( { message: 'Server Error', error: error.message } );
    }
};

exports.getDeliveries = async ( req, res ) => {
    try {
        const deliveries = await DeliveryService.getAllDeliveriesService();
        res.status( 200 ).json( deliveries );
    }
    catch ( error ) {
        res.status( 500 ).json( { message: 'Server Error', error: error.message } );
    }
};

exports.updateDeliveryStatus = async ( req, res ) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedDelivery = await DeliveryService.updateDeliveryStatusService( id, status );
        res.status( 200 ).json( updatedDelivery );
    }
    catch ( error ) {
        res.status( 500 ).json( { message: 'Server Error', error: error.message } );
    }
};

exports.deleteDelivery = async ( req, res ) => {
    try {
        const { id } = req.params;
        await DeliveryService.deleteDeliveryService( id );
        res.status( 200 ).json( { message: 'Delivery deleted successfully' } );
    }
    catch ( error ) {
        res.status( 500 ).json( { message: 'Server Error', error: error.message } );
    }
};

exports.getDeliveryByTrackingNo = async ( req, res ) => {
    try {
        const { trackingNo } = req.params;
        const delivery = await DeliveryService.getDeliveryByTrackingNoService( trackingNo );
        res.status( 200 ).json( delivery );
    }
    catch ( error ) {
        res.status( 500 ).json( { message: 'Server Error', error: error.message } );
    }
};