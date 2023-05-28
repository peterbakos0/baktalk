var validateToken = require('../value-validation/validate-token');

var validateDeleteUserRequest = (clientToken) => {
    return (
        validateToken(clientToken)
    );
};

module.exports = validateDeleteUserRequest;
