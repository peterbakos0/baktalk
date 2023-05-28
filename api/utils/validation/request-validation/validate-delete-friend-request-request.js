var validateToken = require('../value-validation/validate-token');
var validateId = require('../value-validation/validate-id');

var validateDeleteFriendRequestRequest = (friendRequestId, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateId(friendRequestId, false, false)
    );
};

module.exports = validateDeleteFriendRequestRequest;
