var validateToken = require('../value-validation/validate-token');
var validateId = require('../value-validation/validate-id');

var validateSendRoomInvitationRequest = (roomId, receiverUserId, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateId(roomId, false, false) &&
        validateId(receiverUserId, false, false)
    );
};

module.exports = validateSendRoomInvitationRequest;
