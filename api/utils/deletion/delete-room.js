var Room = require('../../DataModels/Room');
var RoomInvitation = require('../../DataModels/RoomInvitation');
var Member = require('../../DataModels/Member');
var Channel = require('../../DataModels/Channel');
var Message = require('../../DataModels/Message');
var Reaction = require('../../DataModels/Reaction');

var deleteRoom = async (roomId) => {
    var memberFilter = {
        roomId: roomId
    };

    await Room.findByIdAndDelete(roomId);

    await RoomInvitation.deleteMany({
        roomId: roomId
    });

    var members = await Member.find(memberFilter);
    await Member.deleteMany(memberFilter);

    var channels = await Channel.find({
        roomId: roomId
    });

    var channelIds = [];
    for(var i = 0; i < channels.length; i++) { channelIds.push(channels[i]._id); }

    await Channel.deleteMany({
        _id: {
            $in: channelIds
        }
    });

    var messages = await Message.find({
        parentType: 'channel',
        parentId: {
            $in: channelIds
        }
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

    return members;
};

module.exports = deleteRoom;
