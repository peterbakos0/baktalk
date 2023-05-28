import previewTypes from '../constants/preview-types';

var getChooseFileAcceptUtil = () => {
    var result = '';

    for(var i = 0; i < previewTypes.length; i++) {
        var previewType = previewTypes[i];

        var text = previewType;
        if(i < (previewTypes.length - 1)) { text += ','; }

        result += text;
    }

    return result;
};

export default getChooseFileAcceptUtil;
