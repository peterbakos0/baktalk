var jwt = require('jsonwebtoken');
var validateAddReactionRequest = require('../utils/validation/request-validation/validate-add-reaction-request');
var verifyAddReactionRequest = require('../utils/verification/verify-add-reaction-request');
var notifyAboutAddReactionOperation = require('../utils/notification/notify-about-add-reaction-operation');
var Client = require('../DataModels/Client');
var Message = require('../DataModels/Message');
var Channel = require('../DataModels/Channel');
var Member = require('../DataModels/Member');
var Reaction = require('../DataModels/Reaction');

var addReactionOperation = async (req, res, io) => {
    try {
        var emojiUnicode = req.body.emojiUnicode;
        var messageId = req.body.messageId;
        var clientToken = req.header('Client-Token');

        var valid = validateAddReactionRequest(emojiUnicode, messageId, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyAddReactionRequest(emojiUnicode, messageId, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var clientTokenData = await jwt.decode(clientToken);

        var client = await Client.findById(clientTokenData.clientId);

        var message = await Message.findById(messageId);

        var reactionAuthorId;
        if(message.parentType === 'directMessaging') {
            reactionAuthorId = client.userId;
        }
        else if(message.parentType === 'channel') {
            var channel = await Channel.findById(message.parentId);

            var member = await Member.findOne({
                userId: client.userId,
                roomId: channel.roomId
            });

            reactionAuthorId = member._id;
        }

        var reaction = await Reaction.create({
            emojiUnicode: emojiUnicode,
            authorId: reactionAuthorId,
            messageId: messageId
        });

        await notifyAboutAddReactionOperation(reaction, io);

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

module.exports = addReactionOperation;
