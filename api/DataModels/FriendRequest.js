var mongoose = require('mongoose');

var friendRequestSchema = new mongoose.Schema({
    senderUserId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    receiverUserId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

var FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

module.exports = FriendRequest;
