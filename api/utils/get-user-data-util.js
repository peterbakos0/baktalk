var User = require('../DataModels/User');
var FriendRequest = require('../DataModels/FriendRequest');
var Friend = require('../DataModels/Friend');
var DirectMessaging = require('../DataModels/DirectMessaging');
var Member = require('../DataModels/Member');
var RoomInvitation = require('../DataModels/RoomInvitation');
var Room = require('../DataModels/Room');
var Channel = require('../DataModels/Channel');
var Client = require('../DataModels/Client');

var getUserDataUtil = async (userId) => {
    var user = await User.findById(userId, {
        passwordDoubleHash: false,
        __v: false
    });

    var friendRequests = await FriendRequest.find({
        $or: [
            {
                senderUserId: user._id
            },
            {
                receiverUserId: user._id
            }
        ]
    }, {
        __v: false
    });

    var friends = await Friend.find({
        userIds: {
            $in: user._id
        }
    }, {
        __v: false
    });

    var directMessagings = await DirectMessaging.find({
        userIds: {
            $in: user._id
        }
    }, {
        __v: false
    });

    var userMembers = await Member.find({
        userId: user._id
    }, {
        __v: false
    });

    var roomIds = [];
    for(var i = 0; i < userMembers.length; i++) { roomIds.push(userMembers[i].roomId); }

    var notIncomingRoomInvitations = await RoomInvitation.find({
        roomId: {
            $in: roomIds
        }
    }, {
        __v: false
    });

    var fellowMembers = await Member.find({
        userId: {
            $ne: user._id
        },
        roomId: {
            $in: roomIds
        }
    }, {
        __v: false
    });

    var otherUserIds = [];

    for(var i = 0; i < friendRequests.length; i++) {
        var friendRequest = friendRequests[i];
        var userIds = [friendRequest.senderUserId.toString(), friendRequest.receiverUserId.toString()];

        otherUserIds.push(userIds[Number(!(userIds.indexOf(user._id.toString())))]);
    }

    for(var i = 0; i < friends.length; i++) { otherUserIds.push(friends[i].userIds[Number(!(friends[i].userIds.indexOf(user._id)))]); }

    for(var i = 0; i < directMessagings.length; i++) {
        var directMessaging = directMessagings[i];
        otherUserIds.push(directMessaging.userIds[Number(!(directMessaging.userIds.indexOf(user._id)))]);
    }

    for(var i = 0; i < notIncomingRoomInvitations.length; i++) { otherUserIds.push(notIncomingRoomInvitations[i].receiverUserId); }
    for(var i = 0; i < fellowMembers.length; i++) { otherUserIds.push(fellowMembers[i].userId); }

    otherUserIds = Array.from(new Set(otherUserIds));

    var otherUsers = await User.find({
        _id: {
            $in: otherUserIds
        }
    }, {
        emailAddress: false,
        passwordDoubleHash: false,
        fileIds: false,
        __v: false
    });

    var rooms = await Room.find({
        _id: {
            $in: roomIds
        }
    }, {
        __v: false
    });

    var incomingRoomInvitations = await RoomInvitation.find({
        receiverUserId: user._id
    }, {
        __v: false
    });

    var pendingRoomIds = [];
    for(var i = 0; i < incomingRoomInvitations.length; i++) { pendingRoomIds.push(incomingRoomInvitations[i].roomId); }

    var pendingRooms = await Room.find({
        _id: {
            $in: pendingRoomIds
        }
    }, {
        fileIds: false,
        __v: false
    });

    var channels = await Channel.find({
        roomId: {
            $in: roomIds
        }
    }, {
        __v: false
    });

    var clients = await Client.find({
        userId: {
            $in: ([user._id].concat(otherUserIds))
        }
    }, {
        __v: false
    });

    return {
        users: ([user].concat(otherUsers)),
        friendRequests: friendRequests,
        friends: friends,
        directMessagings: directMessagings,
        rooms: (rooms.concat(pendingRooms)),
        roomInvitations: (incomingRoomInvitations.concat(notIncomingRoomInvitations)),
        members: (userMembers.concat(fellowMembers)),
        channels: channels,
        clients: clients
    };
};

module.exports = getUserDataUtil;
