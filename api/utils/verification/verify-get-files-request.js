var jwt = require('jsonwebtoken');
var canUserGetFileUtil = require('../can-user-get-file-util');
var Client = require('../../DataModels/Client');

var verifyGetFilesRequest = async (fileIds, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    for(var i = 0; i < fileIds.length; i++) {
        var fileId = fileIds[i];

        var userCanGetFile = await canUserGetFileUtil(client.userId, fileId);
        if(!userCanGetFile) { return false; }
    }

    return true;
};

module.exports = verifyGetFilesRequest;
