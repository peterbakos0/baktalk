var validateToken = require('../value-validation/validate-token');
var validateFile = require('../value-validation/validate-file');

var validateUploadFileRequest = (file, clientToken) => {
    return (
        validateToken(clientToken) &&
        validateFile(file)
    );
};

module.exports = validateUploadFileRequest;
