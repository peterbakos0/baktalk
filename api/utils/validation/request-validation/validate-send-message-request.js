var validateToken = require('../value-validation/validate-token');
var validateMessageText = require('../value-validation/validate-message-text');
var validateIdArray = require('../value-array-validation/validate-id-array');
var validateId = require('../value-validation/validate-id');
var validateMessageParentType = require('../value-validation/validate-message-parent-type');

var validateSendMessageRequest = (messageText, fileIds, reMessageId, messageParentType, messageParentId, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateMessageText(messageText, false) &&
        validateIdArray(fileIds, 4) &&
        validateId(reMessageId, true, false) &&
        validateMessageParentType(messageParentType, false) &&
        validateId(messageParentId, false, false)
    );
};

module.exports = validateSendMessageRequest;
