var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');

var verifyGetUserDataRequest = async (clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var clientIdExists = await Client.exists({
        _id: clientTokenData.clientId
    });
    if(!clientIdExists) { return false; }

    return true;
};

module.exports = verifyGetUserDataRequest;
