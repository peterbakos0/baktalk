var Client = require('../../DataModels/Client');

var deleteAllClients = async () => {
    await Client.deleteMany({});
};

module.exports = deleteAllClients;
