var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var validateUpdateUserRequest = require('../utils/validation/request-validation/validate-update-user-request');
var verifyUpdateUserRequest = require('../utils/verification/verify-update-user-request');
var notifyAboutUpdateUserOperation = require('../utils/notification/notify-about-update-user-operation');
var Client = require('../DataModels/Client');
var User = require('../DataModels/User');

var updateUserOperation = async (req, res, io) => {
    try {
        var emailAddress = req.body.emailAddress;
        var username = req.body.username;
        var passwordHash = req.body.passwordHash;
        var avatarFileId = req.body.avatarFileId;
        var clientToken = req.header('Client-Token');

        var valid = validateUpdateUserRequest(emailAddress, username, passwordHash, avatarFileId, clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyUpdateUserRequest(emailAddress, username, avatarFileId, clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var clientTokenData = await jwt.decode(clientToken);

        var client = await Client.findById(clientTokenData.clientId);

        var update = {};

        if(emailAddress !== undefined) { update.emailAddress = emailAddress; }
        if(username !== undefined) { update.username = username; }
        if(avatarFileId !== undefined) { update.avatarFileId = avatarFileId; }

        if(passwordHash !== undefined) {
            var passwordDoubleHash = crypto
                .createHash('sha256')
                .update(passwordHash)
                .digest('hex');

            update.passwordDoubleHash = passwordDoubleHash;
        }

        var user = await User.findByIdAndUpdate(client.userId, update);

        await notifyAboutUpdateUserOperation(user, io);

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

module.exports = updateUserOperation;
