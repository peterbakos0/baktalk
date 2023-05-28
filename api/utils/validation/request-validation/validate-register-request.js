var validateEmailAddress = require('../value-validation/validate-email-address');
var validateUsername = require('../value-validation/validate-username');
var validateHash = require('../value-validation/validate-hash');

var validateRegisterRequest = (emailAddress, username, passwordHash) => {
    return (
        validateEmailAddress(emailAddress, false) &&
        validateUsername(username, false) &&
        validateHash(passwordHash, false)
    );
};

module.exports = validateRegisterRequest;
