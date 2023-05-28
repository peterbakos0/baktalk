var validateToken = require('../value-validation/validate-token');
var validateChannelName = require('../value-validation/validate-channel-name');
var validateChannelType = require('../value-validation/validate-channel-type');
var validateId = require('../value-validation/validate-id');

var validateCreateChannelRequest = (channelName, channelType, roomId, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateChannelName(channelName, false) &&
        validateChannelType(channelType) &&
        validateId(roomId, false, false)
    );
};

module.exports = validateCreateChannelRequest;
