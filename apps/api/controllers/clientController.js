const clientService = require('../services/clientService');

exports.createClient = async (req, res) => {
  try {
    
    const { fullName, userType, mobile, street, city, barangay } = req.body; 
    
    const client = await clientService.createClientService({
        fullName, 
        userType,
        mobile,
        street, 
        city, 
        barangay 
    });
    
    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      client
    });
  } catch (error) {
    const statusCode = error.message.includes('already exists') ? 400 : 500;
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({ message: messages.join(', ') });
    }

    res.status(statusCode).json({ message: error.message });
  }
};

exports.getClients = async (req, res) => {
  try {
    const clients = await clientService.getAllClientsService();
    res.status(200).json({ 
      success: true, 
      count: clients.length, 
      clients 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};