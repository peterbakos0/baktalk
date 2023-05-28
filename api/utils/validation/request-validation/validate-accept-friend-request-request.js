var validateToken = require('../value-validation/validate-token');
var validateId = require('../value-validation/validate-id');

var validateAcceptFriendRequestRequest = (friendRequestId, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateId(friendRequestId, false, false)
    );
};

module.exports = validateAcceptFriendRequestRequest;
