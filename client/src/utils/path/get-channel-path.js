import getChannelsPath from './get-channels-path';

var getChannelPath = (channelId, roomId) => {
    var channelsPath = getChannelsPath(roomId);

    var result = (channelsPath + '/' + channelId);
    return result;
};

export default getChannelPath;
