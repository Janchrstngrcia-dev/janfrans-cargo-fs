const vehicleService = require( "../services/vehicleService" );

exports.createVehicle = async ( req, res ) => {
    try {
        const { vehicleName, plateNumber, model, vehicleType } = req.body;
        const vehicle = await vehicleService.createVehicleService( {
            vehicleName,
            plateNumber,
            model,
            vehicleType
        } );
        res.status( 201 ).json( {
            success: true,
            message: "Vehicle created successfully",
            vehicle
        } );
    } catch ( error ) {
        const statusCode = error.message.includes( "already exists" ) ? 400 : 500;
        if ( error.name === "ValidationError" ) {
            const messages = Object.values( error.errors ).map( val => val.message );
            return res.status( 400 ).json( { message: messages.join( ", " ) } );
        }
        res.status( statusCode ).json( { message: error.message } );
    }
}