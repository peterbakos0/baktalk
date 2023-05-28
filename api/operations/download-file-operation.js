var mongoose = require('mongoose');
var validateDownloadFileRequest = require('../utils/validation/request-validation/validate-download-file-request');
var verifyDownloadFileRequest = require('../utils/verification/verify-download-file-request');

var downloadFileOperation = async (req, res, gridFsBucket) => {
    try {
        var fileId = req.params.fileId;
        var clientToken = req.header('Client-Token');

        var valid = validateDownloadFileRequest(fileId, clientToken);
        if(!valid) {
            res.status(404).end();
            return;
        }

        var verified = await verifyDownloadFileRequest(fileId, clientToken);
        if(!verified) {
            res.status(404).end();
            return;
        }

        var stream = gridFsBucket.openDownloadStream(mongoose.Types.ObjectId(fileId));

        stream.pipe(res);
    }
    catch(error) {
        console.log(error);
        res.status(404).end();
    }
};

module.exports = downloadFileOperation;
