var validateToken = require('../value-validation/validate-token');
var validateId = require('../value-validation/validate-id');

var validateDeleteMemberRequest = (memberId, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateId(memberId, false, false)
    );
};

module.exports = validateDeleteMemberRequest;
