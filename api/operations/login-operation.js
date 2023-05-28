var jwt = require('jsonwebtoken');
var validateLoginRequest = require('../utils/validation/request-validation/validate-login-request');
var verifyLoginRequest = require('../utils/verification/verify-login-request');
var notifyAboutLoginOperation = require('../utils/notification/notify-about-login-operation');
var Client = require('../DataModels/Client');

var loginOperation = async (req, res, io) => {
    try {
        var userId = req.body.userId;
        var passwordHash = req.body.passwordHash;

        var valid = validateLoginRequest(userId, passwordHash);
        if(!valid) {
            res.json({
                clientToken: null,
                success: false
            });

            return;
        }

        var verified = await verifyLoginRequest(userId, passwordHash);
        if(!verified) {
            res.json({
                clientToken: null,
                success: false
            });

            return;
        }

        var clientExpireDate = new Date((new Date()).getTime() + 60000);

        var client = await Client.create({
            userId: userId,
            expireDate: clientExpireDate
        });

        var clientTokenData = {
            clientId: client._id
        };

        var clientToken = await jwt.sign(clientTokenData, process.env.TOKEN_SECRET);

        await notifyAboutLoginOperation(client, io);

        res.json({
            clientToken: clientToken,
            success: true
        });
    }
    catch(error) {
        console.log(error);

        res.json({
            clientToken: null,
            success: false
        });
    }
};

module.exports = loginOperation;
