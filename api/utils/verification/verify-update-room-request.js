var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');
var Room = require('../../DataModels/Room');
var Member = require('../../DataModels/Member');

var verifyUpdateRoomRequest = async (roomId, roomName, iconFileId, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    var room = await Room.findById(roomId);
    if(!room) { return false; }

    var userHasAdminRoleInRoom = await Member.findOne({
        role: 'admin',
        userId: client.userId,
        roomId: roomId
    });
    if(!userHasAdminRoleInRoom) { return false; }

    if(roomName !== undefined) {
        var roomNameInUse = await Room.exists({
            name: roomName
        });
        if(roomNameInUse) { return false; }
    }

    if(iconFileId !== undefined && iconFileId !== null) {
        var iconFileIdExists = room.fileIds.includes(iconFileId);
        if(!iconFileIdExists) { return false; }
    }

    return true;
};

module.exports = verifyUpdateRoomRequest;
