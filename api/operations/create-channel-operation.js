var validateCreateChannelRequest = require('../utils/validation/request-validation/validate-create-channel-request');
var verifyCreateChannelRequest = require('../utils/verification/verify-create-channel-request');
var notifyAboutCreateChannelOperation = require('../utils/notification/notify-about-create-channel-operation');
var Channel = require('../DataModels/Channel');

var createChannelOperation = async (req, res, io) => {
    try {
        var channelName = req.body.channelName;
        var channelType = req.body.channelType;
        var roomId = req.body.roomId;
        var clientToken = req.header('Client-Token');

        var valid = validateCreateChannelRequest(channelName, channelType, roomId, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyCreateChannelRequest(channelName, roomId, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var channel = await Channel.create({
            name: channelName,
            type: channelType,
            roomId: roomId
        });

        await notifyAboutCreateChannelOperation(channel, io);

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

module.exports = createChannelOperation;
