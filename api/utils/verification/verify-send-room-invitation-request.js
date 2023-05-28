var jwt = require('jsonwebtoken');
var areUsersContactsUtil = require('../are-users-contacts-util');
var Client = require('../../DataModels/Client');
var Member = require('../../DataModels/Member');
var RoomInvitation = require('../../DataModels/RoomInvitation');

var verifySendRoomInvitationRequest = async (roomId, receiverUserId, clientToken) => {
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

    var usersAreContacts = await areUsersContactsUtil([client.userId, receiverUserId]);
    if(!usersAreContacts) { return false; }

    var roomInvitationPendingBetweenUserAndRoom = await RoomInvitation.exists({
        roomId: roomId,
        receiverUserId: receiverUserId
    });
    if(roomInvitationPendingBetweenUserAndRoom) { return false; }

    var receiverUserIsMemberOfRoom = await Member.exists({
        userId: receiverUserId,
        roomId: roomId
    });
    if(receiverUserIsMemberOfRoom) { return false; }

    return true;
};

module.exports = verifySendRoomInvitationRequest;
