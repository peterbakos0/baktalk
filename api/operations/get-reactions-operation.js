var jwt = require('jsonwebtoken');
var validateGetReactionsRequest = require('../utils/validation/request-validation/validate-get-reactions-request');
var verifyGetReactionsRequest = require('../utils/verification/verify-get-reactions-request');
var Client = require('../DataModels/Client');
var Reaction = require('../DataModels/Reaction');
var Message = require('../DataModels/Message');
var DirectMessaging = require('../DataModels/DirectMessaging');
var Channel = require('../DataModels/Channel');
var Member = require('../DataModels/Member');

var getReactionsOperation = async (req, res) => {
    try {
        var reactionFilter = req.body.reactionFilter;
        var skip = req.body.skip;
        var limit = req.body.limit;
        var clientToken = req.header('Client-Token');

        var valid = validateGetReactionsRequest(reactionFilter, skip, limit, clientToken);
        if(!valid) {
            res.json({
                reactions: null,
                success: false
            });

            return;
        }

        var verified = await verifyGetReactionsRequest(clientToken);
        if(!verified) {
            res.json({
                reactions: null,
                success: false
            });

            return;
        }

        var clientTokenData = await jwt.decode(clientToken);

        var client = await Client.findById(clientTokenData.clientId);

        delete reactionFilter.__v;

        var reactions = await Reaction.find(reactionFilter, {
            __v: false
        }, {
            skip: skip,
            limit: limit,
            sort: {
                _id: -1
            }
        });

        for(var i = 0; i < reactions.length; i++) {
            var reaction = reactions[i];

            var message = await Message.findById(reaction.messageId);

            if(message.parentType === 'directMessaging') {
                var userIsInDirectMessaging = await DirectMessaging.exists({
                    _id: message.parentId,
                    userIds: {
                        $in: client.userId
                    }
                });
                if(!userIsInDirectMessaging) { reactions.splice(i, 1); }
            }
            else if(message.parentType === 'channel') {
                var channel = await Channel.findById(message.parentId);

                var userIsMemberOfRoom = await Member.exists({
                    userId: client.userId,
                    roomId: channel.roomId
                });
                if(!userIsMemberOfRoom) { reactions.splice(i, 1); }
            }
        }

        res.json({
            reactions: reactions,
            success: true
        });
    }
    catch(error) {
        console.log(error);

        res.json({
            reactions: null,
            success: false
        });
    }
};

module.exports = getReactionsOperation;
