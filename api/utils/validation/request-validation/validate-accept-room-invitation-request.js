var validateToken = require('../value-validation/validate-token');
var validateId = require('../value-validation/validate-id');

var validateAcceptRoomInvitationRequest = (roomInvitationId, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateId(roomInvitationId, false, false)
    );
};

module.exports = validateAcceptRoomInvitationRequest;
