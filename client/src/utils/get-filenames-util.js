var getFilenamesUtil = (files) => {
    var result = [];
    for(var i = 0; i < files.length; i++) { result.push(files[i].name); }

    return result;
};

export default getFilenamesUtil;
