import getRootPath from './get-root-path';

var getLoginPath = () => {
    var rootPath = getRootPath();

    var result = (rootPath + 'login');
    return result;
};

export default getLoginPath;
