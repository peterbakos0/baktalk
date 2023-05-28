var validateToken = require('../value-validation/validate-token');
var validateUnicode = require('../value-validation/validate-unicode');
var validateId = require('../value-validation/validate-id');

var validateAddReactionRequest = (emojiUnicode, messageId, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateUnicode(emojiUnicode) &&
        validateId(messageId, false, false)
    );
};

module.exports = validateAddReactionRequest;
