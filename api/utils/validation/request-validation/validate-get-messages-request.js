var validateToken = require('../value-validation/validate-token');
var validateFilter = require('../value-validation/validate-filter');
var validateSkip = require('../value-validation/validate-skip');
var validateLimit = require('../value-validation/validate-limit');

var validateGetMessagesRequest = (messageFilter, skip, limit, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateFilter(messageFilter) &&
        validateSkip(skip) &&
        validateLimit(limit)
    );
};

module.exports = validateGetMessagesRequest;
