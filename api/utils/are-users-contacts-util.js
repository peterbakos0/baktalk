var Friend = require('../DataModels/Friend');
var Member = require('../DataModels/Member');

var areUsersContactsUtil = async (userIds) => {
    if(userIds[0].toString() === userIds[1].toString()) { return false; }
    
    var areFriends = await Friend.exists({
        $and: [
            {
                userIds: {
                    $in: userIds[0]
                }
            },
            {
                userIds: {
                    $in: userIds[1]
                }
            }
        ]
    });
    if(areFriends) { return true; }

    var members = await Member.find({
        userId: userIds[0]
    });

    var roomIds = [];
    for(var i = 0; i < members.length; i++) { roomIds.push(members[i].roomId); }

    var usersHaveMutualRoom = await Member.exists({
        userId: userIds[1],
        roomId: {
            $in: roomIds
        }
    });
    if(usersHaveMutualRoom) { return true; }

    return false;
};

module.exports = areUsersContactsUtil;
