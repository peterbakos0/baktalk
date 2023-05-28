var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');
var Member = require('../../DataModels/Member');
var Channel = require('../../DataModels/Channel');

var verifyCreateChannelRequest = async (channelName, roomId, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    var userHasAdminRoleInRoom = await Member.exists({
        role: 'admin',
        userId: client.userId,
        roomId: roomId
    });
    if(!userHasAdminRoleInRoom) { return false; }

    var channelNameInUse = await Channel.exists({
        name: channelName,
        roomId: roomId
    });
    if(channelNameInUse) { return false; }

    return true;
};

module.exports = verifyCreateChannelRequest;
