var jwt = require('jsonwebtoken');
var validateGetMessagesRequest = require('../utils/validation/request-validation/validate-get-messages-request');
var verifyGetMessagesRequest = require('../utils/verification/verify-get-messages-request');
var Client = require('../DataModels/Client');
var Message = require('../DataModels/Message');
var DirectMessaging = require('../DataModels/DirectMessaging');
var Channel = require('../DataModels/Channel');
var Member = require('../DataModels/Member');

var getMessagesOperation = async (req, res) => {
    try {
        var messageFilter = req.body.messageFilter;
        var skip = req.body.skip;
        var limit = req.body.limit;
        var clientToken = req.header('Client-Token');

        var valid = validateGetMessagesRequest(messageFilter, skip, limit, clientToken);
        if(!valid) {
            res.json({
                messages: null,
                success: false
            });

            return;
        }

        var verified = await verifyGetMessagesRequest(clientToken);
        if(!verified) {
            res.json({
                messages: null,
                success: false
            });

            return;
        }

        var clientTokenData = await jwt.decode(clientToken);

        var client = await Client.findById(clientTokenData.clientId);

        delete messageFilter.__v;

        var messages = await Message.find(messageFilter, {
            __v: false
        }, {
            skip: skip,
            limit: limit,
            sort: {
                date: -1
            }
        });

        for(var i = 0; i < messages.length; i++) {
            var message = messages[i];

            if(message.parentType === 'directMessaging') {
                var userIsInDirectMessaging = await DirectMessaging.exists({
                    _id: message.parentId,
                    userIds: {
                        $in: client.userId
                    }
                });
                if(!userIsInDirectMessaging) { messages.splice(i, 1); }
            }
            else if(message.parentType === 'channel') {
                var channel = await Channel.findById(message.parentId);

                var userIsMemberOfRoom = await Member.exists({
                    userId: client.userId,
                    roomId: channel.roomId
                });
                if(!userIsMemberOfRoom) { messages.splice(i, 1); }
            }
        }

        res.json({
            messages: messages,
            success: true
        });
    }
    catch(error) {
        console.log(error);

        res.json({
            messages: null,
            success: false
        });
    }
};

module.exports = getMessagesOperation;
