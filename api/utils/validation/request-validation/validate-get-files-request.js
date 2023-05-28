var validateToken = require('../value-validation/validate-token');
var validateIdArray = require('../value-array-validation/validate-id-array');

var validateGetFilesRequest = (fileIds, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateIdArray(fileIds, 16)
    );
};

module.exports = validateGetFilesRequest;
