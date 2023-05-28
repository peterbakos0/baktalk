var FriendRequest = require('../DataModels/FriendRequest');
var Friend = require('../DataModels/Friend');
var DirectMessaging = require('../DataModels/DirectMessaging');
var Member = require('../DataModels/Member');
var RoomInvitation = require('../DataModels/RoomInvitation');

var getOtherUserIdsUtil = async (userId) => {
    var result = [];

    var friendRequests = await FriendRequest.find({
        $or: [
            {
                senderUserId: userId
            },
            {
                receiverUserId: userId
            }
        ]
    });

    var friends = await Friend.find({
        userIds: {
            $in: userId
        }
    });

    var directMessagings = await DirectMessaging.find({
        userIds: {
            $in: userId
        }
    });

    var userMembers = await Member.find({
        userId: userId
    });

    var roomIds = [];
    for(var i = 0; i < userMembers.length; i++) { roomIds.push(userMembers[i].roomId); }

    var notIncomingRoomInvitations = await RoomInvitation.find({
        roomId: {
            $in: roomIds
        }
    });

    var fellowMembers = await Member.find({
        userId: {
            $ne: userId
        },
        roomId: {
            $in: roomIds
        }
    });

    for(var i = 0; i < friendRequests.length; i++) {
        var friendRequest = friendRequests[i];
        var userIds = [friendRequest.senderUserId.toString(), friendRequest.receiverUserId.toString()];

        result.push(userIds[Number(!(userIds.indexOf(userId.toString())))]);
    }

    for(var i = 0; i < friends.length; i++) { result.push(friends[i].userIds[Number(!(friends[i].userIds.indexOf(userId)))]); }

    for(var i = 0; i < directMessagings.length; i++) {
        var directMessaging = directMessagings[i];
        result.push(directMessaging.userIds[Number(!(directMessaging.userIds.indexOf(userId)))]);
    }

    for(var i = 0; i < notIncomingRoomInvitations.length; i++) { result.push(notIncomingRoomInvitations[i].receiverUserId); }
    for(var i = 0; i < fellowMembers.length; i++) { result.push(fellowMembers[i].userId); }

    result = Array.from(new Set(result));

    return result;
};

module.exports = getOtherUserIdsUtil;
