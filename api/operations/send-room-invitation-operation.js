var validateSendRoomInvitationRequest = require('../utils/validation/request-validation/validate-send-room-invitation-request');
var verifySendRoomInvitationRequest = require('../utils/verification/verify-send-room-invitation-request');
var notifyAboutSendRoomInvitationOperation = require('../utils/notification/notify-about-send-room-invitation-operation');
var RoomInvitation = require('../DataModels/RoomInvitation');

var sendRoomInvitationOperation = async (req, res, io) => {
    try {
        var roomId = req.body.roomId;
        var receiverUserId = req.body.receiverUserId;
        var clientToken = req.header('Client-Token');

        var valid = validateSendRoomInvitationRequest(roomId, receiverUserId, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifySendRoomInvitationRequest(roomId, receiverUserId, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var roomInvitation = await RoomInvitation.create({
            roomId: roomId,
            receiverUserId: receiverUserId
        });

        await notifyAboutSendRoomInvitationOperation(roomInvitation, io);

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

module.exports = sendRoomInvitationOperation;
