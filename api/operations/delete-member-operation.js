var validateDeleteMemberRequest = require('../utils/validation/request-validation/validate-delete-member-request');
var verifyDeleteMemberRequest = require('../utils/verification/verify-delete-member-request');
var deleteMember = require('../utils/deletion/delete-member');
var notifyAboutDeleteMemberOperation = require('../utils/notification/notify-about-delete-member-operation');

var deleteMemberOperation = async (req, res, io) => {
    try {
        var memberId = req.body.memberId;
        var clientToken = req.header('Client-Token');

        var valid = validateDeleteMemberRequest(memberId, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyDeleteMemberRequest(memberId, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var member = await deleteMember(memberId);

        await notifyAboutDeleteMemberOperation(member, io);

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

module.exports = deleteMemberOperation;
