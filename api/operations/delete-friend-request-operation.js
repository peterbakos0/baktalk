var validateDeleteFriendRequestRequest = require('../utils/validation/request-validation/validate-delete-friend-request-request');
var verifyDeleteFriendRequestRequest = require('../utils/verification/verify-delete-friend-request-request');
var deleteFriendRequest = require('../utils/deletion/delete-friend-request');
var notifyAboutDeleteFriendRequestOperation = require('../utils/notification/notify-about-delete-friend-request-operation');

var deleteFriendRequestOperation = async (req, res, io) => {
    try {
        var friendRequestId = req.body.friendRequestId;
        var clientToken = req.header('Client-Token');

        var valid = validateDeleteFriendRequestRequest(friendRequestId, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyDeleteFriendRequestRequest(friendRequestId, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var friendRequest = await deleteFriendRequest(friendRequestId);

        await notifyAboutDeleteFriendRequestOperation(friendRequest, io);

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

module.exports = deleteFriendRequestOperation;
