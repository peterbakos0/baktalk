var mongoose = require('mongoose');
var validateGetFilesRequest = require('../utils/validation/request-validation/validate-get-files-request');
var verifyGetFilesRequest = require('../utils/verification/verify-get-files-request');

var getFilesOperation = async (req, res, File) => {
    try {
        var fileIds = req.body.fileIds;
        var clientToken = req.header('Client-Token');

        var valid = validateGetFilesRequest(fileIds, clientToken);
        if(!valid) {
            res.json({
                files: null,
                success: false
            });

            return;
        }

        var verified = await verifyGetFilesRequest(fileIds, clientToken);
        if(!verified) {
            res.json({
                files: null,
                success: false
            });

            return;
        }

        var files = [];

        for(var i = 0; i < fileIds.length; i++) {
            var fileId = fileIds[i];

            files.push(await File.findOne({
                _id: (mongoose.Types.ObjectId(fileId))
            }));
        }

        res.json({
            files: files,
            success: true
        });
    }
    catch(error) {
        console.log(error);

        res.json({
            files: null,
            success: false
        });
    }
};

module.exports = getFilesOperation;
