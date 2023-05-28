var validateDeleteChannelRequest = require('../utils/validation/request-validation/validate-delete-channel-request');
var verifyDeleteChannelRequest = require('../utils/verification/verify-delete-channel-request');
var deleteChannel = require('../utils/deletion/delete-channel');
var notifyAboutDeleteChannelOperation = require('../utils/notification/notify-about-delete-channel-operation');

var deleteChannelOperation = async (req, res, io) => {
    try {
        var channelId = req.body.channelId;
        var clientToken = req.header('Client-Token');

        var valid = validateDeleteChannelRequest(channelId, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyDeleteChannelRequest(channelId, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var channel = await deleteChannel(channelId);

        await notifyAboutDeleteChannelOperation(channel, io);

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

module.exports = deleteChannelOperation;
