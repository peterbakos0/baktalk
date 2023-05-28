var validateUpdateMemberRequest = require('../utils/validation/request-validation/validate-update-member-request');
var verifyUpdateMemberRequest = require('../utils/verification/verify-update-member-request');
var notifyAboutUpdateMemberOperation = require('../utils/notification/notify-about-update-member-operation');
var Member = require('../DataModels/Member');

var updateMemberOperation = async (req, res, io) => {
    try {
        var memberId = req.body.memberId;
        var memberName = req.body.memberName;
        var role = req.body.role;
        var clientToken = req.header('Client-Token');

        var valid = validateUpdateMemberRequest(memberId, memberName, role, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyUpdateMemberRequest(memberId, memberName, role, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var update = {};

        if(memberName !== undefined) { update.name = memberName; }
        if(role !== undefined) { update.role = role; }

        var member = await Member.findByIdAndUpdate(memberId, update);

        await notifyAboutUpdateMemberOperation(member, io);

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

module.exports = updateMemberOperation;
