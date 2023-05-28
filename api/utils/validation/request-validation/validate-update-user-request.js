var validateToken = require('../value-validation/validate-token');
var validateEmailAddress = require('../value-validation/validate-email-address');
var validateUsername = require('../value-validation/validate-username');
var validateHash = require('../value-validation/validate-hash');
var validateId = require('../value-validation/validate-id');

var validateUpdateUserRequest = (emailAddress, username, passwordHash, avatarFileId, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateEmailAddress(emailAddress, true) &&
        validateUsername(username, true) &&
        validateHash(passwordHash, true) &&
        validateId(avatarFileId, true, true)
    );
};

module.exports = validateUpdateUserRequest;
