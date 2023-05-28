var jwt = require('jsonwebtoken');
var validateSendMessageRequest = require('../utils/validation/request-validation/validate-send-message-request');
var verifySendMessageRequest = require('../utils/verification/verify-send-message-request');
var notifyAboutSendMessageOperation = require('../utils/notification/notify-about-send-message-operation');
var Client = require('../DataModels/Client');
var Channel = require('../DataModels/Channel');
var Member = require('../DataModels/Member');
var Message = require('../DataModels/Message');

var sendMessageOperation = async (req, res, io) => {
    try {
        var messageText = req.body.messageText;
        var fileIds = req.body.fileIds;
        var reMessageId = req.body.reMessageId;
        var messageParentType = req.body.messageParentType;
        var messageParentId = req.body.messageParentId;
        var clientToken = req.header('Client-Token');

        var valid = validateSendMessageRequest(messageText, fileIds, reMessageId, messageParentType, messageParentId, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifySendMessageRequest(messageText, fileIds, reMessageId, messageParentType, messageParentId, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var clientTokenData = await jwt.decode(clientToken);

        var client = await Client.findById(clientTokenData.clientId);

        var messageAuthorId;
        if(messageParentType === 'directMessaging') {
            messageAuthorId = client.userId;
        }
        else if(messageParentType === 'channel') {
            var channel = await Channel.findById(messageParentId);

            var member = await Member.findOne({
                userId: client.userId,
                roomId: channel.roomId
            });

            messageAuthorId = member._id;
        }

        var messageDate = new Date();

        var readerIds = [messageAuthorId];

        var message = await Message.create({
            text: messageText,
            fileIds: fileIds,
            authorId: messageAuthorId,
            reMessageId: reMessageId,
            date: messageDate,
            readerIds: readerIds,
            parentType: messageParentType,
            parentId: messageParentId
        });

        await notifyAboutSendMessageOperation(message, io);

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

module.exports = sendMessageOperation;
