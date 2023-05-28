var validateToken = require('../value-validation/validate-token');

var validateConnectSocketRequest = (clientToken) => {
    return (
        validateToken(clientToken)
    );
};

module.exports = validateConnectSocketRequest;
