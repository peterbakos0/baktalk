import getMainPath from './get-main-path';

var getRoomsPath = () => {
    var mainPath = getMainPath();

    var result = (mainPath + '/rooms');
    return result;
};

export default getRoomsPath;
