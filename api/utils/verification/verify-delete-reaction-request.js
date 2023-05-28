var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');
var Reaction = require('../../DataModels/Reaction');
var Message = require('../../DataModels/Message');
var Member = require('../../DataModels/Member');
var Channel = require('../../DataModels/Channel');

var verifyDeleteReactionRequest = async (reactionId, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    var reaction = await Reaction.findById(reactionId);
    if(!reaction) { return false; }

    var message = await Message.findById(reaction.messageId);

    if(message.parentType === 'directMessaging') {
        if(reaction.authorId.toString() !== client.userId.toString()) { return false; }
    }
    else if(message.parentType === 'channel') {
        var userIsAuthorOfReaction = await Member.exists({
            _id: reaction.authorId,
            userId: client.userId
        });

        if(!userIsAuthorOfReaction) {
            var channel = await Channel.findById(message.parentId);

            var userHasAdminRoleInRoom = await Member.exists({
                role: 'admin',
                userId: client.userId,
                roomId: channel.roomId
            });
            if(!userHasAdminRoleInRoom) { return false; }
        }
    }

    return true;
};

module.exports = verifyDeleteReactionRequest;
