var validateToken = require('../value-validation/validate-token');
var validateId = require('../value-validation/validate-id');

var validateStartDirectMessagingRequest = (userId, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateId(userId, false, false)
    );
};

module.exports = validateStartDirectMessagingRequest;
