var validateDeleteRoomInvitationRequest = require('../utils/validation/request-validation/validate-delete-room-invitation-request');
var verifyDeleteRoomInvitationRequest = require('../utils/verification/verify-delete-room-invitation-request');
var deleteRoomInvitation = require('../utils/deletion/delete-room-invitation');
var notifyAboutDeleteRoomInvitationOperation = require('../utils/notification/notify-about-delete-room-invitation-operation');

var deleteRoomInvitationOperation = async (req, res, io) => {
    try {
        var roomInvitationId = req.body.roomInvitationId;
        var clientToken = req.header('Client-Token');

        var valid = validateDeleteRoomInvitationRequest(roomInvitationId, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyDeleteRoomInvitationRequest(roomInvitationId, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var roomInvitation = await deleteRoomInvitation(roomInvitationId);

        await notifyAboutDeleteRoomInvitationOperation(roomInvitation, io);

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

module.exports = deleteRoomInvitationOperation;
