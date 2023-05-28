var mongoose = require('mongoose');

var memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        default: null
    },
    role: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    roomId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

var Member = mongoose.model('Member', memberSchema);

module.exports = Member;
