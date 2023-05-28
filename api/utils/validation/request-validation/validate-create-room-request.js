var validateToken = require('../value-validation/validate-token');
var validateRoomName = require('../value-validation/validate-room-name');

var validateCreateRoomRequest = (roomName, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateRoomName(roomName, false)
    );
};

module.exports = validateCreateRoomRequest;
