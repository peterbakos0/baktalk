var validateToken = require('../value-validation/validate-token');
var validateId = require('../value-validation/validate-id');

var validateDeleteMessageRequest = (messageId, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateId(messageId, false, false)
    );
};

module.exports = validateDeleteMessageRequest;
