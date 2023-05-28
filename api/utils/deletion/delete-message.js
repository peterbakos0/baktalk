var Message = require('../../DataModels/Message');
var Reaction = require('../../DataModels/Reaction');

var deleteMessage = async (messageId) => {
    var message = await Message.findByIdAndDelete(messageId);

    await Reaction.deleteMany({
        messageId: messageId
    });

    return message;
};

module.exports = deleteMessage;
