var disconnectClientsUtil = (clients, io, peerServer) => {
    for(var i = 0; i < clients.length; i++) {
        var client = clients[i];

        try { io.sockets.sockets.get(client.socketId).disconnect(); }
        catch(error) {}

        try { peerServer.realm.clients.get(client.peerId).socket.close(); }
        catch(error) {}
    }
};

module.exports = disconnectClientsUtil;
