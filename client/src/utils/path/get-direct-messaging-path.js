import getHomePath from './get-home-path';

var getDirectMessagingPath = (directMessagingId) => {
    var homePath = getHomePath();

    var result = (homePath + '/' + directMessagingId);
    return result;
};

export default getDirectMessagingPath;
