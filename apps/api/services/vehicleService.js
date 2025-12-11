const Vehicle = require( '../models/Vehicle' );

exports.createVehicleService = async ( vehicleData ) => {
    const vehicle = await Vehicle.create( {
        vehicleName: vehicleData.vehicleName,
        plateNumber: vehicleData.plateNumber,
        model: vehicleData.model,
        vehicleType: vehicleData.vehicleType
    } );
    return vehicle;
};

exports.getAllVehiclesService = async () => {
    return await Vehicle.find().sort( { createdAt: -1 } );
};

exports.getVehicleByIdService = async ( vehicleId ) => {
    return await Vehicle.findById( vehicleId );
}
exports.updateVehicleService = async ( vehicleId, updateData ) => {
    return await Vehicle.findByIdAnd
    update( vehicleId, updateData, { new: true } );
};

exports.deleteVehicleService = async ( vehicleId ) => {
    return await Vehicle.findByIdAndDelete( vehicleId );
};