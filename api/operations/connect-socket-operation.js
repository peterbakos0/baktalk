var jwt = require('jsonwebtoken');
var validateConnectSocketRequest = require('../utils/validation/request-validation/validate-connect-socket-request');
var verifyConnectSocketRequest = require('../utils/verification/verify-connect-socket-request');
var notifyAboutConnectSocketOperation = require('../utils/notification/notify-about-connect-socket-operation');
var deleteClient = require('../utils/deletion/delete-client');
var disconnectClientsUtil = require('../utils/disconnect-clients-util');
var notifyAboutClientDeletion = require('../utils/notification/notify-about-client-deletion');
var Client = require('../DataModels/Client');

var connectSocketOperation = async (socket, io, peerServer) => {
    try {
        var clientToken = socket.handshake.query.clientToken;

        var valid = validateConnectSocketRequest(clientToken);
        if(!valid) {
            socket.disconnect();
            return;
        }

        var verified = await verifyConnectSocketRequest(clientToken);
        if(!verified) {
            socket.disconnect();
            return;
        }

        var clientTokenData = await jwt.decode(clientToken);

        var client = await Client.findById(clientTokenData.clientId);

        var update = {
            socketId: socket.id
        };

        if(client.peerId !== null) { update.expireDate = null; }

        await client.updateOne(update);

        await notifyAboutConnectSocketOperation(client, io);

        socket.on('disconnect', async () => {
            var client = await deleteClient(clientTokenData.clientId);
            if(!client) { return; }

            await disconnectClientsUtil([client], io, peerServer);
            await notifyAboutClientDeletion(client, io);
        });
    }
    catch(error) {
        console.log(error);
        socket.disconnect();
    }
};

module.exports = connectSocketOperation;
