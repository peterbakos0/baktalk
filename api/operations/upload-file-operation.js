var { Readable } = require('stream');
var jwt = require('jsonwebtoken');
var validateUploadFileRequest = require('../utils/validation/request-validation/validate-upload-file-request');
var verifyUploadFileRequest = require('../utils/verification/verify-upload-file-request');
var notifyAboutUploadFileOperation = require('../utils/notification/notify-about-upload-file-operation');
var Client = require('../DataModels/Client');
var User = require('../DataModels/User');

var uploadFileOperation = async (req, res, io, gridFsBucket) => {
    try {
        var file = req.files[0];
        var clientToken = req.header('Client-Token');

        var valid = validateUploadFileRequest(file, clientToken);
        if(!valid) {
            res.json({
                fileId: null,
                success: false
            });

            return;
        }

        var verified = await verifyUploadFileRequest(clientToken);
        if(!verified) {
            res.json({
                fileId: null,
                success: false
            });

            return;
        }

        var clientTokenData = await jwt.decode(clientToken);

        var client = await Client.findById(clientTokenData.clientId);

        var _file = await new Promise((resolve) => {
            var stream = gridFsBucket.openUploadStream(file.originalname, {
                contentType: file.mimetype
            });

            stream.on('finish', resolve);

            Readable.from(file.buffer).pipe(stream);
        });

        var user = await User.findByIdAndUpdate(client.userId, {
            $push: {
                fileIds: _file._id
            }
        });

        await notifyAboutUploadFileOperation(user, io);

        res.json({
            fileId: _file._id,
            success: true
        });
    }
    catch(error) {
        console.log(error);

        res.json({
            fileId: null,
            success: false
        });
    }
};

module.exports = uploadFileOperation;
