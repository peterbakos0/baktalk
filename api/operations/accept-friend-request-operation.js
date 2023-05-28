var validateAcceptFriendRequestRequest = require('../utils/validation/request-validation/validate-accept-friend-request-request');
var verifyAcceptFriendRequestRequest = require('../utils/verification/verify-accept-friend-request-request');
var deleteFriendRequest = require('../utils/deletion/delete-friend-request');
var notifyAboutAcceptFriendRequestOperation = require('../utils/notification/notify-about-accept-friend-request-operation');
var Friend = require('../DataModels/Friend');

var acceptFriendRequestOperation = async (req, res, io) => {
    try {
        var friendRequestId = req.body.friendRequestId;
        var clientToken = req.header('Client-Token');

        var valid = validateAcceptFriendRequestRequest(friendRequestId, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyAcceptFriendRequestRequest(friendRequestId, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var friendRequest = await deleteFriendRequest(friendRequestId);

        await Friend.create({
            userIds: [friendRequest.senderUserId, friendRequest.receiverUserId]
        });

        await notifyAboutAcceptFriendRequestOperation(friendRequest, io);

        res.json({
            success: true
        });
    }
    catch(error) {
        console.log(error);

        res.json({
            success: false
        });
    }
};

module.exports = acceptFriendRequestOperation;
