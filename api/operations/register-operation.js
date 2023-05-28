var crypto = require('crypto');
var validateRegisterRequest = require('../utils/validation/request-validation/validate-register-request');
var verifyRegisterRequest = require('../utils/verification/verify-register-request');
var User = require('../DataModels/User');

var registerOperation = async (req, res) => {
    try {
        var emailAddress = req.body.emailAddress;
        var username = req.body.username;
        var passwordHash = req.body.passwordHash;

        var valid = validateRegisterRequest(emailAddress, username, passwordHash);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyRegisterRequest(emailAddress, username);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var passwordDoubleHash = crypto
            .createHash('sha256')
            .update(passwordHash)
            .digest('hex');

        await User.create({
            emailAddress: emailAddress,
            username: username,
            passwordDoubleHash: passwordDoubleHash
        });
    
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

module.exports = registerOperation;
