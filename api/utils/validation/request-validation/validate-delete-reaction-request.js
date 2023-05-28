var validateToken = require('../value-validation/validate-token');
var validateId = require('../value-validation/validate-id');

var validateDeleteReactionRequest = (reactionId, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateId(reactionId, false, false)
    );
};

module.exports = validateDeleteReactionRequest;
