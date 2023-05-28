var jwt = require('jsonwebtoken');
var areUsersContactsUtil = require('../are-users-contacts-util');
var Client = require('../../DataModels/Client');
var DirectMessaging = require('../../DataModels/DirectMessaging');

var verifyStartDirectMessagingRequest = async (userId, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    var usersAreContacts = await areUsersContactsUtil([client.userId, userId]);
    if(!usersAreContacts) { return false; }

    var directMessagingExistsBetweenTheTwo = await DirectMessaging.exists({
        $and: [
            {
                userIds: {
                    $in: client.userId
                }
            },
            {
                userIds: {
                    $in: userId
                }
            }
        ]
    });
    if(directMessagingExistsBetweenTheTwo) { return false; }

    return true;
};

module.exports = verifyStartDirectMessagingRequest;
