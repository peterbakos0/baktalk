import getMainPath from './get-main-path';

var getSettingsPath = () => {
    var mainPath = getMainPath();

    var result = (mainPath + '/settings');
    return result;
};

export default getSettingsPath;
