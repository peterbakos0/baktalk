var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');
var Room = require('../../DataModels/Room');

var verifyCreateRoomRequest = async (roomName, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var clientIdExists = await Client.exists({
        _id: clientTokenData.clientId
    });
    if(!clientIdExists) { return false; }

    var roomNameInUse = await Room.exists({
        name: roomName
    });
    if(roomNameInUse) { return false; }

    return true;
};

module.exports = verifyCreateRoomRequest;
