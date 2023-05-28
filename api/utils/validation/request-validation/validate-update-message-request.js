var validateToken = require('../value-validation/validate-token');
var validateId = require('../value-validation/validate-id');
var validateMessageText = require('../value-validation/validate-message-text');
var validatePinned = require('../value-validation/validate-pinned');

var validateUpdateMessageRequest = (messageId, messageText, pinned, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateId(messageId, false, false) &&
        validateMessageText(messageText, true) &&
        validatePinned(pinned)
    );
};

module.exports = validateUpdateMessageRequest;
