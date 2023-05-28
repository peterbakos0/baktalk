var validateAcceptRoomInvitationRequest = require('../utils/validation/request-validation/validate-accept-room-invitation-request');
var verifyAcceptRoomInvitationRequest = require('../utils/verification/verify-accept-room-invitation-request');
var deleteRoomInvitation = require('../utils/deletion/delete-room-invitation');
var notifyAboutAcceptRoomInvitationOperation = require('../utils/notification/notify-about-accept-room-invitation-operation');
var Member = require('../DataModels/Member');

var acceptRoomInvitationOperation = async (req, res, io) => {
    try {
        var roomInvitationId = req.body.roomInvitationId;
        var clientToken = req.header('Client-Token');

        var valid = validateAcceptRoomInvitationRequest(roomInvitationId, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyAcceptRoomInvitationRequest(roomInvitationId, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var roomInvitation = await deleteRoomInvitation(roomInvitationId);

        await Member.create({
            role: 'member',
            userId: roomInvitation.receiverUserId,
            roomId: roomInvitation.roomId
        });

        await notifyAboutAcceptRoomInvitationOperation(roomInvitation, io);

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

module.exports = acceptRoomInvitationOperation;
