var subtractArraysUtil = (arrays) => {
    var result = [];

    for(var i = 0; i < arrays[0].length; i++) {
        var element = arrays[0][i];

        var includesElement = arrays[1].includes(element);
        if(!includesElement) { result.push(element); }
    }

    return result;
};

export default subtractArraysUtil;
