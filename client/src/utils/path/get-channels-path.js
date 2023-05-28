import getRoomPath from './get-room-path';

var getChannelsPath = (roomId) => {
    var roomPath = getRoomPath(roomId);

    var result = (roomPath + '/channels');
    return result;
};

export default getChannelsPath;
