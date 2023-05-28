var mongoose = require('mongoose');

var clientSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    socketId: {
        type: String,
        required: false,
        default: null
    },
    peerId: {
        type: String,
        required: false,
        default: null
    },
    expireDate: {
        type: Date,
        required: true
    }
});

var Client = mongoose.model('Client', clientSchema);

module.exports = Client;
