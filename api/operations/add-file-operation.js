var validateAddFileRequest = require('../utils/validation/request-validation/validate-add-file-request');
var verifyAddFileRequest = require('../utils/verification/verify-add-file-request');
var notifyAboutAddFileOperation = require('../utils/notification/notify-about-add-file-operation');
var DirectMessaging = require('../DataModels/DirectMessaging');
var Room = require('../DataModels/Room');

var addFileOperation = async (req, res, io) => {
    try {
        var fileId = req.body.fileId;
        var fileParentType = req.body.fileParentType;
        var fileParentId = req.body.fileParentId;
        var clientToken = req.header('Client-Token');

        var valid = validateAddFileRequest(fileId, fileParentType, fileParentId, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyAddFileRequest(fileId, fileParentType, fileParentId, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var update = {
            $push: {
                fileIds: fileId
            }
        };

        var fileParent;

        if(fileParentType === 'directMessaging') { fileParent = await DirectMessaging.findByIdAndUpdate(fileParentId, update); }
        else if(fileParentType === 'room') { fileParent = await Room.findByIdAndUpdate(fileParentId, update); }

        await notifyAboutAddFileOperation(fileParentType, fileParent, io);

        res.json({
            success: true
        });
    }
    catch(error) {
        console.log(error);

        res.json({
            success: false
        });
    }
};

module.exports = addFileOperation;
