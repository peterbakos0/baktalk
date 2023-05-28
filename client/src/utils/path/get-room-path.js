import getRoomsPath from './get-rooms-path';

var getRoomPath = (roomId) => {
    var roomsPath = getRoomsPath();

    var result = (roomsPath + '/' + roomId);
    return result;
};

export default getRoomPath;
