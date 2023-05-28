var jwt = require('jsonwebtoken');
var validateGetUserDataRequest = require('../utils/validation/request-validation/validate-get-user-data-request');
var verifyGetUserDataRequest = require('../utils/verification/verify-get-user-data-request');
var getUserDataUtil = require('../utils/get-user-data-util');
var Client = require('../DataModels/Client');

var getUserDataOperation = async (req, res) => {
    try {
        var clientToken = req.header('Client-Token');

        var valid = validateGetUserDataRequest(clientToken);
        if(!valid) {
            res.json({
                userData: null,
                success: false
            });

            return;
        }

        var verified = await verifyGetUserDataRequest(clientToken);
        if(!verified) {
            res.json({
                userData: null,
                success: false
            });

            return;
        }

        var clientTokenData = await jwt.decode(clientToken);

        var client = await Client.findById(clientTokenData.clientId);

        var userData = await getUserDataUtil(client.userId);

        res.json({
            userData: userData,
            success: true
        });
    }
    catch(error) {
        console.log(error);

        res.json({
            userData: null,
            success: false
        });
    }
};

module.exports = getUserDataOperation;
