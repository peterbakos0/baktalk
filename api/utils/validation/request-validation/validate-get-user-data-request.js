var validateToken = require('../value-validation/validate-token');

var validateGetUserDataRequest = (clientToken) => {
    return (
        validateToken(clientToken)
    );
};

module.exports = validateGetUserDataRequest;
