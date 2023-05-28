var jwt = require('jsonwebtoken');
var validateCreateRoomRequest = require('../utils/validation/request-validation/validate-create-room-request');
var verifyCreateRoomRequest = require('../utils/verification/verify-create-room-request');
var notifyAboutCreateRoomOperation = require('../utils/notification/notify-about-create-room-operation');
var Client = require('../DataModels/Client');
var Room = require('../DataModels/Room');
var Member = require('../DataModels/Member');

var createRoomOperation = async (req, res, io) => {
    try {
        var roomName = req.body.roomName;
        var clientToken = req.header('Client-Token');
        
        var valid = validateCreateRoomRequest(roomName, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyCreateRoomRequest(roomName, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var clientTokenData = await jwt.decode(clientToken);

        var client = await Client.findById(clientTokenData.clientId);

        var room = await Room.create({
            name: roomName
        });

        var member = await Member.create({
            role: 'admin',
            userId: client.userId,
            roomId: room._id
        });

        await notifyAboutCreateRoomOperation(member, io);

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

module.exports = createRoomOperation;
