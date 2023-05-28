import getRoomPath from './get-room-path';

var getRoomSettingsPath = (roomId) => {
    var roomPath = getRoomPath(roomId);

    var result = (roomPath + '/settings');
    return result;
};

export default getRoomSettingsPath;
