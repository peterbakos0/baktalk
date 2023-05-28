var validateUnfriendRequest = require('../utils/validation/request-validation/validate-unfriend-request');
var verifyUnfriendRequest = require('../utils/verification/verify-unfriend-request');
var deleteFriend = require('../utils/deletion/delete-friend');
var notifyAboutUnfriendOperation = require('../utils/notification/notify-about-unfriend-operation');

var unfriendOperation = async (req, res, io) => {
    try {
        var friendId = req.body.friendId;
        var clientToken = req.header('Client-Token');

        var valid = validateUnfriendRequest(friendId, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyUnfriendRequest(friendId, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var friend = await deleteFriend(friendId);

        await notifyAboutUnfriendOperation(friend, io);

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

module.exports = unfriendOperation;
