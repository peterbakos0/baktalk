var Friend = require('../DataModels/Friend');
var Member = require('../DataModels/Member');

var getContactUserIdsUtil = async (userId) => {
    var result = [];

    var friends = await Friend.find({
        userIds: {
            $in: userId
        }
    });

    var userMembers = await Member.find({
        userId: userId
    });

    var roomIds = [];
    for(var i = 0; i < userMembers.length; i++) { roomIds.push(userMembers[i].roomId); }

    var fellowMembers = await Member.find({
        userId: {
            $ne: userId
        },
        roomId: {
            $in: roomIds
        }
    });

    for(var i = 0; i < friends.length; i++) { result.push(friends[i].userIds[Number(!(friends[i].userIds.indexOf(userId)))]); }
    for(var i = 0; i < fellowMembers.length; i++) { result.push(fellowMembers[i].userId); }

    result = Array.from(new Set(result));

    return result;
};

module.exports = getContactUserIdsUtil;
