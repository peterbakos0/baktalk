var jwt = require('jsonwebtoken');
var validateSendFriendRequestRequest = require('../utils/validation/request-validation/validate-send-friend-request-request');
var verifySendFriendRequestRequest = require('../utils/verification/verify-send-friend-request-request');
var notifyAboutSendFriendRequestOperation = require('../utils/notification/notify-about-send-friend-request-operation');
var Client = require('../DataModels/Client');
var FriendRequest = require('../DataModels/FriendRequest');

var sendFriendRequestOperation = async (req, res, io) => {
    try {
        var receiverUserId = req.body.receiverUserId;
        var clientToken = req.header('Client-Token');

        var valid = validateSendFriendRequestRequest(receiverUserId, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifySendFriendRequestRequest(receiverUserId, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var clientTokenData = await jwt.decode(clientToken);

        var client = await Client.findById(clientTokenData.clientId);

        var friendRequest = await FriendRequest.create({
            senderUserId: client.userId,
            receiverUserId: receiverUserId
        });

        await notifyAboutSendFriendRequestOperation(friendRequest, io);

        res.json({
            success: true
        });
    }
    catch(error) {
        console.log(error);

        res.json({
            success: false
        })
    }
};

module.exports = sendFriendRequestOperation;
