var validateUpdateMessageRequest = require('../utils/validation/request-validation/validate-update-message-request');
var verifyUpdateMessageRequest = require('../utils/verification/verify-update-message-request');
var notifyAboutUpdateMessageOperation = require('../utils/notification/notify-about-update-message-operation');
var Message = require('../DataModels/Message');

var updateMessageOperation = async (req, res, io) => {
    try {
        var messageId = req.body.messageId;
        var messageText = req.body.messageText;
        var pinned = req.body.pinned;
        var clientToken = req.header('Client-Token');

        var valid = validateUpdateMessageRequest(messageId, messageText, pinned, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyUpdateMessageRequest(messageId, messageText, pinned, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var update = {};

        if(pinned !== undefined) { update.pinned = pinned; }

        if(messageText !== undefined) {
            update.text = messageText;
            update.editDate = new Date();
        }

        var message = await Message.findByIdAndUpdate(messageId, update);

        await notifyAboutUpdateMessageOperation(message, io);

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

module.exports = updateMessageOperation;
