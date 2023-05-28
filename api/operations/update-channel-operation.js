var validateUpdateChannelRequest = require('../utils/validation/request-validation/validate-update-channel-request');
var verifyUpdateChannelRequest = require('../utils/verification/verify-update-channel-request');
var notifyAboutUpdateChannelOperation = require('../utils/notification/notify-about-update-channel-operation');
var Channel = require('../DataModels/Channel');

var updateChannelOperation = async (req, res, io) => {
    try {
        var channelId = req.body.channelId;
        var channelName = req.body.channelName;
        var clientToken = req.header('Client-Token');

        var valid = validateUpdateChannelRequest(channelId, channelName, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyUpdateChannelRequest(channelId, channelName, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var update = {};
        if(channelName !== undefined) { update.name = channelName; }

        var channel = await Channel.findByIdAndUpdate(channelId, update);

        await notifyAboutUpdateChannelOperation(channel, io);

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

module.exports = updateChannelOperation;
