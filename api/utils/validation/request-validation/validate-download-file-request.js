var validateToken = require('../value-validation/validate-token');
var validateId = require('../value-validation/validate-id');

var validateDownloadFileRequest = (fileId, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateId(fileId, false, false)
    );
};

module.exports = validateDownloadFileRequest;
