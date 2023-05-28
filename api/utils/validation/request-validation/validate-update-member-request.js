var validateToken = require('../value-validation/validate-token');
var validateId = require('../value-validation/validate-id');
var validateMemberName = require('../value-validation/validate-member-name');
var validateRole = require('../value-validation/validate-role');

var validateUpdateMemberRequest = (memberId, memberName, role, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateId(memberId, false, false) &&
        validateMemberName(memberName) &&
        validateRole(role)
    );
};

module.exports = validateUpdateMemberRequest;
