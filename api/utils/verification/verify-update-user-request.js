var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');
var User = require('../../DataModels/User');

var verifyUpdateUserRequest = async (emailAddress, username, avatarFileId, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    var user = await User.findById(client.userId);

    if(emailAddress !== undefined) {
        var emailAddressInUse = await User.exists({
            emailAddress: emailAddress
        });
        if(emailAddressInUse) { return false; }
    }

    if(username !== undefined) {
        var usernameInUse = await User.exists({
            username: username
        });
        if(usernameInUse) { return false; }
    }

    if(avatarFileId !== undefined && avatarFileId !== null) {
        var avatarFileIdExists = user.fileIds.includes(avatarFileId);
        if(!avatarFileIdExists) { return false; }
    }

    return true;
};

module.exports = verifyUpdateUserRequest;
