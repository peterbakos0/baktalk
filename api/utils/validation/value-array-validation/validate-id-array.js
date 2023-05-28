var validateId = require('../value-validation/validate-id');

var validateIdArray = (value, maxLength) => {
    if(
        (value === undefined) ||
        (value.constructor !== Array) ||
        (value.length > maxLength)
    ) {
        return false;
    }

    for(var i = 0; i < value.length; i++) {
        var element = value[i];

        var valid = validateId(element, false, false);
        if(!valid) { return false; }
    }

    return true;
};

module.exports = validateIdArray;
