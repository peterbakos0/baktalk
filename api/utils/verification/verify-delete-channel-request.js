var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');
var Channel = require('../../DataModels/Channel');
var Member = require('../../DataModels/Member');

var verifyDeleteChannelRequest = async (channelId, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    var channel = await Channel.findById(channelId);
    if(!channel) { return false; }

    var userHasAdminRoleInRoom = await Member.exists({
        role: 'admin',
        userId: client.userId,
        roomId: channel.roomId
    });
    if(!userHasAdminRoleInRoom) { return false; }

    return true;
};

module.exports = verifyDeleteChannelRequest;
