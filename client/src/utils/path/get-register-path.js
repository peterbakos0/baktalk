import getRootPath from './get-root-path';

var getRegisterPath = () => {
    var rootPath = getRootPath();

    var result = (rootPath + 'register');
    return result;
};

export default getRegisterPath;
