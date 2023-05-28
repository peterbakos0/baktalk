var validateToken = require('../value-validation/validate-token');
var validateId = require('../value-validation/validate-id');

var validateDeleteRoomRequest = (roomId, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateId(roomId, false, false)
    );
};

module.exports = validateDeleteRoomRequest;
