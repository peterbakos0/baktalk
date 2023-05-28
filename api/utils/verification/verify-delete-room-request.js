var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');
var Member = require('../../DataModels/Member');

var verifyDeleteRoomRequest = async (roomId, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    var userHasAdminRoleInRoom = await Member.findOne({
        role: 'admin',
        userId: client.userId,
        roomId: roomId
    });
    if(!userHasAdminRoleInRoom) { return false; }

    return true;
};

module.exports = verifyDeleteRoomRequest;
