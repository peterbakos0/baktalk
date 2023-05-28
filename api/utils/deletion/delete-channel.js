var Channel = require('../../DataModels/Channel');
var Message = require('../../DataModels/Message');
var Reaction = require('../../DataModels/Reaction');

var deleteChannel = async (channelId) => {
    var channel = await Channel.findByIdAndDelete(channelId);

    var messages = await Message.find({
        parentType: 'channel',
        parentId: channelId
    });

    var messageIds = [];
    for(var i = 0; i < messages.length; i++) { messageIds.push(messages[i]._id); }

    await Message.deleteMany({
        _id: {
            $in: messageIds
        }
    });

    await Reaction.deleteMany({
        messageId: {
            $in: messageIds
        }
    });

    return channel;
};

module.exports = deleteChannel;
