import getMainPath from './get-main-path';

var getHomePath = () => {
    var mainPath = getMainPath();

    var result = (mainPath + '/home');
    return result;
};

export default getHomePath;
