var mongoose = require('mongoose');

var roomInvitationSchema = mongoose.Schema({
    roomId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    receiverUserId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

var RoomInvitation = mongoose.model('RoomInvitation', roomInvitationSchema);

module.exports = RoomInvitation;
