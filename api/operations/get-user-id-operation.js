var validateGetUserIdRequest = require('../utils/validation/request-validation/validate-get-user-id-request');
var verifyGetUserIdRequest = require('../utils/verification/verify-get-user-id-request');
var User = require('../DataModels/User');

var getUserIdOperation = async (req, res) => {
    try {
        var username = req.body.username;

        var valid = validateGetUserIdRequest(username);
        if(!valid) {
            res.json({
                userId: null,
                success: false
            });

            return;
        }

        var verified = await verifyGetUserIdRequest(username);
        if(!verified) {
            res.json({
                userId: null,
                success: false
            });

            return;
        }

        var user = await User.findOne({
            username: username
        });

        res.json({
            userId: user._id,
            success: true
        });
    }
    catch(error) {
        console.log(error);

        res.json({
            userId: null,
            success: false
        });
    }
};

module.exports = getUserIdOperation;
