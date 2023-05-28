var mongoose = require('mongoose');

var directMessagingSchema = new mongoose.Schema({
    userIds: {
        type: [mongoose.Types.ObjectId],
        required: true
    },
    fileIds: {
        type: [mongoose.Types.ObjectId],
        required: false,
        default: []
    }
});

var DirectMessaging = mongoose.model('DirectMessaging', directMessagingSchema);

module.exports = DirectMessaging;
