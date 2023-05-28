var jwt = require('jsonwebtoken');
var emojiUnicodes = require('../../constants/emoji-unicodes');
var Client = require('../../DataModels/Client');
var Message = require('../../DataModels/Message');
var DirectMessaging = require('../../DataModels/DirectMessaging');
var Channel = require('../../DataModels/Channel');
var Member = require('../../DataModels/Member');
var Reaction = require('../../DataModels/Reaction');

var verifyAddReactionRequest = async (emojiUnicode, messageId, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    var message = await Message.findById(messageId);
    if(!message) { return false; }

    var reactionAuthorId;
    if(message.parentType === 'directMessaging') {
        var userIsInDirectMessaging = await DirectMessaging.exists({
            _id: message.parentId,
            userIds: {
                $in: client.userId
            }
        });

        if(userIsInDirectMessaging) { reactionAuthorId = client.userId; }
    }
    else if(message.parentType === 'channel') {
        var channel = await Channel.findById(message.parentId);

        var member = await Member.findOne({
            userId: client.userId,
            roomId: channel.roomId
        });

        if(member) { reactionAuthorId = member._id; }
    }

    if(!reactionAuthorId) { return false; }

    var emojiUnicodeExists = emojiUnicodes.includes(emojiUnicode);
    if(!emojiUnicodeExists) { return false; }

    var reactionExists = await Reaction.exists({
        emojiUnicode: emojiUnicode,
        authorId: reactionAuthorId,
        messageId: messageId
    });
    if(reactionExists) { return false; }

    return true;
};

module.exports = verifyAddReactionRequest;
