var jwt = require('jsonwebtoken');
var validateConnectPeerRequest = require('../utils/validation/request-validation/validate-connect-peer-request');
var verifyConnectPeerRequest = require('../utils/verification/verify-connect-peer-request');
var notifyAboutConnectPeerOperation = require('../utils/notification/notify-about-connect-peer-operation');
var deleteClient = require('../utils/deletion/delete-client');
var disconnectClientsUtil = require('../utils/disconnect-clients-util');
var notifyAboutClientDeletion = require('../utils/notification/notify-about-client-deletion');
var Client = require('../DataModels/Client');

var connectPeerOperation = async (peer, io, peerServer) => {
    try {
        var clientToken = peer.clientToken;

        var valid = validateConnectPeerRequest(clientToken);
        if(!valid) {
            peer.socket.close();
            return;
        }

        var verified = await verifyConnectPeerRequest(clientToken);
        if(!verified) {
            peer.socket.close();
            return;
        }

        var clientTokenData = await jwt.decode(clientToken);

        var client = await Client.findById(clientTokenData.clientId);

        var update = {
            peerId: peer.id
        };

        if(client.socketId !== null) { update.expireDate = null; }

        await client.updateOne(update);

        await notifyAboutConnectPeerOperation(client, io);

        peer.socket.on('close', async () => {
            var client = await deleteClient(clientTokenData.clientId);
            if(!client) { return; }

            await disconnectClientsUtil([client], io, peerServer);
            await notifyAboutClientDeletion(client, io);
        });
    }
    catch(error) {
        console.log(error);
        peer.socket.close();
    }
};

module.exports = connectPeerOperation;
