var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');
var User = require('../../DataModels/User');
var DirectMessaging = require('../../DataModels/DirectMessaging');
var Member = require('../../DataModels/Member');
var Room = require('../../DataModels/Room');

var verifyAddFileRequest = async (fileId, fileParentType, fileParentId, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    var userOwnsFile = await User.exists({
        _id: client.userId,
        fileIds: {
            $in: fileId
        }
    });
    if(!userOwnsFile) { return false; }

    var fileParent;
    if(fileParentType === 'directMessaging') {
        fileParent = await DirectMessaging.findOne({
            _id: fileParentId,
            userIds: {
                $in: client.userId
            }
        });
    }
    else if(fileParentType === 'room') {
        var userIsMemberOfRoom = await Member.exists({
            userId: client.userId,
            roomId: fileParentId
        });

        if(userIsMemberOfRoom) { fileParent = await Room.findById(fileParentId); }
    }

    if(!fileParent) { return false; }

    var fileParentHasFile = fileParent.fileIds.includes(fileId);
    if(fileParentHasFile) { return false; }

    return true;
};

module.exports = verifyAddFileRequest;
