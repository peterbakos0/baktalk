var validateToken = require('../value-validation/validate-token');

var validateConnectPeerRequest = (clientToken) => {
    return (
        validateToken(clientToken)
    );
};

module.exports = validateConnectPeerRequest;
