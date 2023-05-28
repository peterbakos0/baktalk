var validateToken = require('../value-validation/validate-token');
var validateId = require('../value-validation/validate-id');

var validateSendFriendRequestRequest = (receiverUserId, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateId(receiverUserId, false, false)
    );
};

module.exports = validateSendFriendRequestRequest;
