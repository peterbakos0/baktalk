var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');

var verifyConnectPeerRequest = async (clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var peerCanConnect = await Client.exists({
        _id: clientTokenData.clientId,
        peerId: null
    });
    if(!peerCanConnect) { return false; }

    return true;
};

module.exports = verifyConnectPeerRequest;
