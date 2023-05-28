import getRootPath from './get-root-path';

var getMainPath = () => {
    var rootPath = getRootPath();

    var result = (rootPath + 'main');
    return result;
};

export default getMainPath;
