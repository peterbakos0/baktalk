var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: false,
        default: ''
    },
    fileIds: {
        type: [mongoose.Types.ObjectId],
        required: true
    },
    authorId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    reMessageId: {
        type: mongoose.Types.ObjectId,
        required: false,
        default: null
    },
    date: {
        type: Date,
        required: true
    },
    editDate: {
        type: Date,
        required: false,
        default: null
    },
    pinned: {
        type: Boolean,
        required: false,
        default: false
    },
    readerIds: {
        type: [mongoose.Types.ObjectId],
        required: true
    },
    parentType: {
        type: String,
        required: true
    },
    parentId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;
