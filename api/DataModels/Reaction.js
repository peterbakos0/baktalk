var mongoose = require('mongoose');

var reactionSchema = new mongoose.Schema({
    emojiUnicode: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    messageId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

var Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;
