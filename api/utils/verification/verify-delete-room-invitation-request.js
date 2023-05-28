var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');
var RoomInvitation = require('../../DataModels/RoomInvitation');
var Member = require('../../DataModels/Member');

var verifyDeleteRoomInvitationRequest = async (roomInvitationId, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    var roomInvitation = await RoomInvitation.findById(roomInvitationId);
    if(!roomInvitation) { return false; }

    if(roomInvitation.receiverUserId.toString() !== client.userId.toString()) {
        var userHasAdminRoleInRoom = await Member.exists({
            role: 'admin',
            userId: client.userId,
            roomId: roomInvitation.roomId
        });
        if(!userHasAdminRoleInRoom) { return false; }
    }

    return true;
};

module.exports = verifyDeleteRoomInvitationRequest;
