var validateToken = require('../value-validation/validate-token');
var validateMessageParentType = require('../value-validation/validate-message-parent-type');
var validateId = require('../value-validation/validate-id');
var validateLimit = require('../value-validation/validate-limit');

var validateReadMessagesRequest = (messageParentType, messageParentId, limit, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateMessageParentType(messageParentType, false) &&
        validateId(messageParentId, false, false) &&
        validateLimit(limit)
    );
};

module.exports = validateReadMessagesRequest;
