var Client = require('../../DataModels/Client');

var deleteClient = async (clientId) => {
    var client = await Client.findByIdAndDelete(clientId);
    return client;
};

module.exports = deleteClient;
