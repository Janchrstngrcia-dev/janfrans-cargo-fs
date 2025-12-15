const vehicleService = require("../services/vehicleService");

// Create Vehicle (POST /api/vehicles/add)
exports.createVehicle = async (req, res) => {
    try {
        const vehicle = await vehicleService.createVehicleService(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            vehicle
        });
    } catch (error) {
        const statusCode = error.message && error.message.includes("E11000 duplicate key") ? 400 : 500;
        res.status(statusCode).json({ message: error.message || "Server Error" });
    }
};

// Get All Vehicles (GET /api/vehicles)
exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await vehicleService.getAllVehiclesService();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Vehicle (PUT /api/vehicles/:id)
exports.updateVehicle = async (req, res) => {
    try {
        const updatedVehicle = await vehicleService.updateVehicleService(req.params.id, req.body);
        if (!updatedVehicle) return res.status(404).json({ message: "Vehicle not found" });
        res.status(200).json({ success: true, vehicle: updatedVehicle });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Vehicle (DELETE /api/vehicles/:id)
exports.deleteVehicle = async (req, res) => {
    try {
        await vehicleService.deleteVehicleService(req.params.id);
        res.status(200).json({ success: true, message: "Vehicle deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};