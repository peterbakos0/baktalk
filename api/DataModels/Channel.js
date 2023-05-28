var mongoose = require('mongoose');

var channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    roomId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

var Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;
