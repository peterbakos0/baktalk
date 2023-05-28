var validateDeleteRoomRequest = require('../utils/validation/request-validation/validate-delete-room-request');
var verifyDeleteRoomRequest = require('../utils/verification/verify-delete-room-request');
var deleteRoom = require('../utils/deletion/delete-room');
var notifyAboutDeleteRoomOperation = require('../utils/notification/notify-about-delete-room-operation');

var deleteRoomOperation = async (req, res, io) => {
    try {
        var roomId = req.body.roomId;
        var clientToken = req.header('Client-Token');

        var valid = validateDeleteRoomRequest(roomId, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyDeleteRoomRequest(roomId, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var members = await deleteRoom(roomId);

        await notifyAboutDeleteRoomOperation(members, io);

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

module.exports = deleteRoomOperation;
