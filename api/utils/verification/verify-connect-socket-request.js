var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');

var verifyConnectSocketRequest = async (clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var socketCanConnect = await Client.exists({
        _id: clientTokenData.clientId,
        socketId: null
    });
    if(!socketCanConnect) { return false; }

    return true;
};

module.exports = verifyConnectSocketRequest;
