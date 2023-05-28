var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');
var RoomInvitation = require('../../DataModels/RoomInvitation');

var verifyAcceptRoomInvitationRequest = async (roomInvitationId, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    var userIsReceiverOfRoomInvitation = await RoomInvitation.exists({
        _id: roomInvitationId,
        receiverUserId: client.userId
    });
    if(!userIsReceiverOfRoomInvitation) { return false; }

    return true;
};

module.exports = verifyAcceptRoomInvitationRequest;
