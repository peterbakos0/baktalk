var validateDeleteMessageRequest = require('../utils/validation/request-validation/validate-delete-message-request');
var verifyDeleteMessageRequest = require('../utils/verification/verify-delete-message-request');
var deleteMessage = require('../utils/deletion/delete-message');
var notifyAboutDeleteMessageOperation = require('../utils/notification/notify-about-delete-message-operation');

var deleteMessageOperation = async (req, res, io) => {
    try {
        var messageId = req.body.messageId;
        var clientToken = req.header('Client-Token');

        var valid = validateDeleteMessageRequest(messageId, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyDeleteMessageRequest(messageId, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var message = await deleteMessage(messageId);

        await notifyAboutDeleteMessageOperation(message, io);

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

module.exports = deleteMessageOperation;
