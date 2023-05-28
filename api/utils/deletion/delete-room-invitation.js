var RoomInvitation = require('../../DataModels/RoomInvitation');

var deleteRoomInvitation = async (roomInvitationId) => {
    var roomInvitation = await RoomInvitation.findByIdAndDelete(roomInvitationId);
    return roomInvitation;
};

module.exports = deleteRoomInvitation;
