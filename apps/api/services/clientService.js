const Client = require('../models/Client');
exports.createClientService = async (clientData) => {
  const client = await Client.create({
    fullName: clientData.fullName,
      userType: Number( clientData.userType ),
    mobile: clientData.mobile,
    street: clientData.street,
    city: clientData.city,
    barangay: clientData.barangay,
    status: 1
  });

  return client;
};

exports.getAllClientsService = async () => {
  return await Client.find().sort({ createdAt: -1 });
};