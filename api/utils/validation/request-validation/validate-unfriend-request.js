var validateToken = require('../value-validation/validate-token');
var validateId = require('../value-validation/validate-id');

var validateUnfriendRequest = (friendId, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateId(friendId, false, false)
    );
};

module.exports = validateUnfriendRequest;
