import getRoomPath from './get-room-path';

var getMembersPath = (roomId) => {
    var roomPath = getRoomPath(roomId);

    var result = (roomPath + '/members');
    return result;
};

export default getMembersPath;
