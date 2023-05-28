var jwt = require('jsonwebtoken');
var canUserGetFileUtil = require('../can-user-get-file-util');
var Client = require('../../DataModels/Client');

var verifyDownloadFileRequest = async (fileId, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    var userCanGetFile = await canUserGetFileUtil(client.userId, fileId);
    if(!userCanGetFile) { return false; }

    return true;
};

module.exports = verifyDownloadFileRequest;
