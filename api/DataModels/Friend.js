var mongoose = require('mongoose');

var friendSchema = new mongoose.Schema({
    userIds: {
        type: [mongoose.Types.ObjectId],
        required: true
    }
});

var Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
