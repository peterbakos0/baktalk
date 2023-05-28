var Client = require('../../DataModels/Client');

var deleteExpiredClients = async () => {
    var now = new Date();

    var clientFilter = {
        expireDate: {
            $lte: now
        }
    };

    var clients = await Client.find(clientFilter);
    await Client.deleteMany(clientFilter);

    return clients;
};

module.exports = deleteExpiredClients;
