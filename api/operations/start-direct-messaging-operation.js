var jwt = require('jsonwebtoken');
var validateStartDirectMessagingRequest = require('../utils/validation/request-validation/validate-start-direct-messaging-request');
var verifyStartDirectMessagingRequest = require('../utils/verification/verify-start-direct-messaging-request');
var notifyAboutStartDirectMessagingOperation = require('../utils/notification/notify-about-start-direct-messaging-operation');
var Client = require('../DataModels/Client');
var DirectMessaging = require('../DataModels/DirectMessaging');

var startDirectMessagingOperation = async (req, res, io) => {
    try {
        var userId = req.body.userId;
        var clientToken = req.header('Client-Token');

        var valid = validateStartDirectMessagingRequest(userId, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyStartDirectMessagingRequest(userId, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var clientTokenData = await jwt.decode(clientToken);

        var client = await Client.findById(clientTokenData.clientId);

        var directMessaging = await DirectMessaging.create({
            userIds: [client.userId, userId]
        });

        await notifyAboutStartDirectMessagingOperation(directMessaging, io);

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

module.exports = startDirectMessagingOperation;
