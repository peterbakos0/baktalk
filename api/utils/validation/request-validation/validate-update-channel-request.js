var validateToken = require('../value-validation/validate-token');
var validateId = require('../value-validation/validate-id');
var validateChannelName = require('../value-validation/validate-channel-name');

var validateUpdateChannelRequest = (channelId, channelName, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateId(channelId, false, false) &&
        validateChannelName(channelName, true)
    );
};

module.exports = validateUpdateChannelRequest;
