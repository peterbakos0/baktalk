var getOtherUserIdsUtil = require('./get-other-user-ids-util');
var getPendingRoomIdsUtil = require('./get-pending-room-ids-util');
var User = require('../DataModels/User');
var DirectMessaging = require('../DataModels/DirectMessaging');
var Member = require('../DataModels/Member');
var Room = require('../DataModels/Room');

var canUserGetFileUtil = async (userId, fileId) => {
    var user = await User.findById(userId);

    var userOwnsFile = user.fileIds.includes(fileId);
    if(userOwnsFile) { return true; }

    var otherUserIds = await getOtherUserIdsUtil(user._id);

    var otherUsers = await User.find({
        _id: {
            $in: otherUserIds
        }
    });

    for(var i = 0; i < otherUsers.length; i++) {
        var otherUser = otherUsers[i];
        if(otherUser.avatarFileId !== null && otherUser.avatarFileId.toString() === fileId) { return true; }
    }

    var directMessagings = await DirectMessaging.find({
        userIds: {
            $in: user._id
        }
    });

    for(var i = 0; i < directMessagings.length; i++) {
        var directMessaging = directMessagings[i];

        var directMessagingHasFile = directMessaging.fileIds.includes(fileId);
        if(directMessagingHasFile) { return true; }
    }

    var pendingRoomIds = await getPendingRoomIdsUtil(user._id);

    var pendingRooms = await Room.find({
        _id: {
            $in: pendingRoomIds
        }
    });

    for(var i = 0; i < pendingRooms.length; i++) {
        var pendingRoom = pendingRooms[i];
        if(pendingRoom.iconFileId !== null && pendingRoom.iconFileId.toString() === fileId) { return true; }
    }

    var members = await Member.find({
        userId: user._id
    });

    var roomIds = [];
    for(var i = 0; i < members.length; i++) { roomIds.push(members[i].roomId); }

    var rooms = await Room.find({
        _id: {
            $in: roomIds
        }
    });

    for(var i = 0; i < rooms.length; i++) {
        var room = rooms[i];

        var roomHasFile = room.fileIds.includes(fileId);
        if(roomHasFile) { return true; }
    }

    return false;
};

module.exports = canUserGetFileUtil;
