var validateDeleteReactionRequest = require('../utils/validation/request-validation/validate-delete-reaction-request');
var verifyDeleteReactionRequest = require('../utils/verification/verify-delete-reaction-request');
var deleteReaction = require('../utils/deletion/delete-reaction');
var notifyAboutDeleteReactionOperation = require('../utils/notification/notify-about-delete-reaction-operation');

var deleteReactionOperation = async (req, res, io) => {
    try {
        var reactionId = req.body.reactionId;
        var clientToken = req.header('Client-Token');

        var valid = validateDeleteReactionRequest(reactionId, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyDeleteReactionRequest(reactionId, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var reaction = await deleteReaction(reactionId);

        await notifyAboutDeleteReactionOperation(reaction, io);

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

module.exports = deleteReactionOperation;
