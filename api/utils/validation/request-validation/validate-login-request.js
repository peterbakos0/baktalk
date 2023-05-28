var validateId = require('../value-validation/validate-id');
var validateHash = require('../value-validation/validate-hash');

var validateLoginRequest = (userId, passwordHash) => {
    return (
        validateId(userId, false, false) &&
        validateHash(passwordHash, false)
    );
};

module.exports = validateLoginRequest;
