var validateUsername = require('../value-validation/validate-username');

var validateGetUserIdRequest = (username) => {
    return (
        validateUsername(username, false)
    );
};

module.exports = validateGetUserIdRequest;
