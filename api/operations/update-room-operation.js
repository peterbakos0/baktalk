var validateUpdateRoomRequest = require('../utils/validation/request-validation/validate-update-room-request');
var verifyUpdateRoomRequest = require('../utils/verification/verify-update-room-request');
var notifyAboutUpdateRoomOperation = require('../utils/notification/notify-about-update-room-operation');
var Room = require('../DataModels/Room');

var updateRoomOperation = async (req, res, io) => {
    try {
        var roomId = req.body.roomId;
        var roomName = req.body.roomName;
        var iconFileId = req.body.iconFileId;
        var clientToken = req.header('Client-Token');

        var valid = validateUpdateRoomRequest(roomId, roomName, iconFileId, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyUpdateRoomRequest(roomId, roomName, iconFileId, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var update = {};

        if(roomName !== undefined) { update.name = roomName; }
        if(iconFileId !== undefined) { update.iconFileId = iconFileId; }

        var room = await Room.findByIdAndUpdate(roomId, update);

        await notifyAboutUpdateRoomOperation(room, io);

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

module.exports = updateRoomOperation;
