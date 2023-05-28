var jwt = require('jsonwebtoken');
var validateReadMessagesRequest = require('../utils/validation/request-validation/validate-read-messages-request');
var verifyReadMessagesRequest = require('../utils/verification/verify-read-messages-request');
var notifyAboutReadMessagesOperation = require('../utils/notification/notify-about-read-messages-operation');
var Client = require('../DataModels/Client');
var Channel = require('../DataModels/Channel');
var Member = require('../DataModels/Member');
var Message = require('../DataModels/Message');

var readMessagesOperation = async (req, res, io) => {
    try {
        var messageParentType = req.body.messageParentType;
        var messageParentId = req.body.messageParentId;
        var limit = req.body.limit;
        var clientToken = req.header('Client-Token');

        var valid = validateReadMessagesRequest(messageParentType, messageParentId, limit, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyReadMessagesRequest(messageParentType, messageParentId, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var clientTokenData = await jwt.decode(clientToken);

        var client = await Client.findById(clientTokenData.clientId);

        var readerId;
        if(messageParentType === 'directMessaging') {
            readerId = client.userId;
        }
        else if(messageParentType === 'channel') {
            var channel = await Channel.findById(messageParentId);

            var member = await Member.findOne({
                userId: client.userId,
                roomId: channel.roomId
            });

            readerId = member._id;
        }

        var messages = await Message.find({
            parentType: messageParentType,
            parentId: messageParentId
        }, null, {
            limit: limit,
            sort: {
                date: -1
            }
        });

        var messageIds = [];
        for(var i = 0; i < messages.length; i++) { messageIds.push(messages[i]._id); }

        messages = await Message.find({
            _id: {
                $in: messageIds
            },
            readerIds: {
                $nin: readerId
            }
        });

        messageIds = [];
        for(var i = 0; i < messages.length; i++) { messageIds.push(messages[i]._id); }

        await Message.updateMany({
            _id: {
                $in: messageIds
            }
        }, {
            $push: {
                readerIds: readerId
            }
        });

        messages = await Message.find({
            _id: {
                $in: messageIds
            }
        });

        await notifyAboutReadMessagesOperation(messageParentType, messageParentId, messages, io);

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

module.exports = readMessagesOperation;
