var validateToken = require('../value-validation/validate-token');
var validateId = require('../value-validation/validate-id');
var validateFileParentType = require('../value-validation/validate-file-parent-type');

var validateAddFileRequest = (fileId, fileParentType, fileParentId, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateId(fileId, false, false) &&
        validateFileParentType(fileParentType) &&
        validateId(fileParentId, false, false)
    );
};

module.exports = validateAddFileRequest;
