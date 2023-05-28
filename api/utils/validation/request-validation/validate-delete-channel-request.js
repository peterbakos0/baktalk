var validateToken = require('../value-validation/validate-token');
var validateId = require('../value-validation/validate-id');

var validateDeleteChannelRequest = (channelId, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateId(channelId, false, false)
    );
};

module.exports = validateDeleteChannelRequest;
