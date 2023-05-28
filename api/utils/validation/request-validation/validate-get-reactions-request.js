var validateToken = require('../value-validation/validate-token');
var validateFilter = require('../value-validation/validate-filter');
var validateSkip = require('../value-validation/validate-skip');
var validateLimit = require('../value-validation/validate-limit');

var validateGetReactionsRequest = (reactionFilter, skip, limit, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateFilter(reactionFilter) &&
        validateSkip(skip) &&
        validateLimit(limit)
    );
};

module.exports = validateGetReactionsRequest;
