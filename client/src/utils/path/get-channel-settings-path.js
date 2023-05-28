import getChannelPath from './get-channel-path';

var getChannelSettingsPath = (channelId, roomId) => {
    var channelPath = getChannelPath(channelId, roomId);

    var result = (channelPath + '/settings');
    return result;
};

export default getChannelSettingsPath;
