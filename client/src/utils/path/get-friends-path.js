import getMainPath from './get-main-path';

var getFriendsPath = () => {
    var mainPath = getMainPath();

    var result = (mainPath + '/friends');
    return result;
};

export default getFriendsPath;
