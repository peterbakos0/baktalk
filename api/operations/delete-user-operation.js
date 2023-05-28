var jwt = require('jsonwebtoken');
var validateDeleteUserRequest = require('../utils/validation/request-validation/validate-delete-user-request');
var verifyDeleteUserRequest = require('../utils/verification/verify-delete-user-request');
var deleteUser = require('../utils/deletion/delete-user');
var disconnectClientsUtil = require('../utils/disconnect-clients-util');
var notifyAboutDeleteUserOperation = require('../utils/notification/notify-about-delete-user-operation');
var Client = require('../DataModels/Client');

var deleteUserOperation = async (req, res, io, peerServer) => {
    try {
        var clientToken = req.header('Client-Token');

        var valid = validateDeleteUserRequest(clientToken);
        if(!valid) {
            res.json({
                success: false
            });

            return;
        }

        var verified = await verifyDeleteUserRequest(clientToken);
        if(!verified) {
            res.json({
                success: false
            });

            return;
        }

        var clientTokenData = await jwt.decode(clientToken);

        var client = await Client.findById(clientTokenData.clientId);
        
        var { user, clients } = await deleteUser(client.userId);

        disconnectClientsUtil(clients, io, peerServer);

        await notifyAboutDeleteUserOperation(user, io);

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

module.exports = deleteUserOperation;
