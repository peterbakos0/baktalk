var validateToken = require('../value-validation/validate-token');
var validateId = require('../value-validation/validate-id');
var validateRoomName = require('../value-validation/validate-room-name');

var validateUpdateRoomRequest = (roomId, roomName, iconFileId, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateId(roomId, false, false) &&
        validateRoomName(roomName, true) &&
        validateId(iconFileId, true, true)
    );
};

module.exports = validateUpdateRoomRequest;
