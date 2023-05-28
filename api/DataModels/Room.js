var mongoose = require('mongoose');

var roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fileIds: {
        type: [mongoose.Types.ObjectId],
        required: false,
        default: []
    },
    iconFileId: {
        type: mongoose.Types.ObjectId,
        required: false,
        default: null
    }
});

var Room = mongoose.model('Room', roomSchema);

module.exports = Room;
