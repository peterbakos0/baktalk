var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    emailAddress: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    passwordDoubleHash: {
        type: String,
        required: true
    },
    fileIds: {
        type: [mongoose.Types.ObjectId],
        required: false,
        default: []
    },
    avatarFileId: {
        type: mongoose.Types.ObjectId,
        required: false,
        default: null
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
