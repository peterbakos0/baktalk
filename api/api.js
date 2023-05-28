var http = require('http');
var dotenv = require('dotenv');
var cors = require('cors');
var multer = require('multer');
var socketIo = require('socket.io');
var { PeerServer } = require('./libs/peer/src');
var mongoose = require('mongoose');
var express = require('express');
var config = require('./constants/config');
var proxyUtil = require('./utils/proxy-util');
var disconnectClientsUtil = require('./utils/disconnect-clients-util');
var deleteAllClients = require('./utils/deletion/delete-all-clients');
var deleteExpiredClients = require('./utils/deletion/delete-expired-clients');
var notifyAboutExpiredClientsDeletion = require('./utils/notification/notify-about-expired-clients-deletion');
var registerOperation = require('./operations/register-operation');
var loginOperation = require('./operations/login-operation');
var getUserIdOperation = require('./operations/get-user-id-operation');
var getUserDataOperation = require('./operations/get-user-data-operation');
var updateUserOperation = require('./operations/update-user-operation');
var deleteUserOperation = require('./operations/delete-user-operation');
var sendFriendRequestOperation = require('./operations/send-friend-request-operation');
var acceptFriendRequestOperation = require('./operations/accept-friend-request-operation');
var deleteFriendRequestOperation = require('./operations/delete-friend-request-operation');
var unfriendOperation = require('./operations/unfriend-operation');
var startDirectMessagingOperation = require('./operations/start-direct-messaging-operation');
var createRoomOperation = require('./operations/create-room-operation');
var updateRoomOperation = require('./operations/update-room-operation');
var deleteRoomOperation = require('./operations/delete-room-operation');
var sendRoomInvitationOperation = require('./operations/send-room-invitation-operation');
var acceptRoomInvitationOperation = require('./operations/accept-room-invitation-operation');
var deleteRoomInvitationOperation = require('./operations/delete-room-invitation-operation');
var updateMemberOperation = require('./operations/update-member-operation');
var deleteMemberOperation = require('./operations/delete-member-operation');
var createChannelOperation = require('./operations/create-channel-operation');
var updateChannelOperation = require('./operations/update-channel-operation');
var deleteChannelOperation = require('./operations/delete-channel-operation');
var sendMessageOperation = require('./operations/send-message-operation');
var getMessagesOperation = require('./operations/get-messages-operation');
var updateMessageOperation = require('./operations/update-message-operation');
var readMessagesOperation = require('./operations/read-messages-operation');
var deleteMessageOperation = require('./operations/delete-message-operation');
var addReactionOperation = require('./operations/add-reaction-operation');
var getReactionsOperation = require('./operations/get-reactions-operation');
var deleteReactionOperation = require('./operations/delete-reaction-operation');
var uploadFileOperation = require('./operations/upload-file-operation');
var addFileOperation = require('./operations/add-file-operation');
var getFilesOperation = require('./operations/get-files-operation');
var downloadFileOperation = require('./operations/download-file-operation');
var connectSocketOperation = require('./operations/connect-socket-operation');
var connectPeerOperation = require('./operations/connect-peer-operation');

var gridFsBucket;
var File;

var app = express();
var server = http.createServer(app);

var io = socketIo({
    path: config.socketPath
});

var peerServer = PeerServer({
    port: config.peerPort,
    path: config.peerPath
});

var upload = multer({
    storage: (multer.memoryStorage())
});

dotenv.config();

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

app.use(cors({
    origin: config.corsOrigin,
    credentials: true
}));

app.use(express.json());

app.post('/register', (req, res) => { registerOperation(req, res); });
app.post('/login', (req, res) => { loginOperation(req, res, io); });
app.post('/get-user-id', (req, res) => { getUserIdOperation(req, res); });
app.get('/get-user-data', (req, res) => { getUserDataOperation(req, res); });
app.post('/update-user', (req, res) => { updateUserOperation(req, res, io); });
app.get('/delete-user', (req, res) => { deleteUserOperation(req, res, io, peerServer); });
app.post('/send-friend-request', (req, res) => { sendFriendRequestOperation(req, res, io); });
app.post('/accept-friend-request', (req, res) => { acceptFriendRequestOperation(req, res, io); });
app.post('/delete-friend-request', (req, res) => { deleteFriendRequestOperation(req, res, io); });
app.post('/unfriend', (req, res) => { unfriendOperation(req, res, io); });
app.post('/start-direct-messaging', (req, res) => { startDirectMessagingOperation(req, res, io); });
app.post('/create-room', (req, res) => { createRoomOperation(req, res, io); });
app.post('/update-room', (req, res) => { updateRoomOperation(req, res, io); });
app.post('/delete-room', (req, res) => { deleteRoomOperation(req, res, io); });
app.post('/send-room-invitation', (req, res) => { sendRoomInvitationOperation(req, res, io); });
app.post('/accept-room-invitation', (req, res) => { acceptRoomInvitationOperation(req, res, io); });
app.post('/delete-room-invitation', (req, res) => { deleteRoomInvitationOperation(req, res, io); });
app.post('/update-member', (req, res) => { updateMemberOperation(req, res, io); });
app.post('/delete-member', (req, res) => { deleteMemberOperation(req, res, io); });
app.post('/create-channel', (req, res) => { createChannelOperation(req, res, io); });
app.post('/update-channel', (req, res) => { updateChannelOperation(req, res, io); });
app.post('/delete-channel', (req, res) => { deleteChannelOperation(req, res, io); });
app.post('/send-message', (req, res) => { sendMessageOperation(req, res, io); });
app.post('/get-messages', (req, res) => { getMessagesOperation(req, res); });
app.post('/update-message', (req, res) => { updateMessageOperation(req, res, io); });
app.post('/read-messages', (req, res) => { readMessagesOperation(req, res, io); });
app.post('/delete-message', (req, res) => { deleteMessageOperation(req, res, io); });
app.post('/add-reaction', (req, res) => { addReactionOperation(req, res, io); });
app.post('/get-reactions', (req, res) => { getReactionsOperation(req, res); });
app.post('/delete-reaction', (req, res) => { deleteReactionOperation(req, res, io); });
app.post('/upload-file', upload.any(), (req, res) => { uploadFileOperation(req, res, io, gridFsBucket); });
app.post('/add-file', (req, res) => { addFileOperation(req, res, io); });
app.post('/get-files', (req, res) => { getFilesOperation(req, res, File); });
app.get('/download-file/:fileId', (req, res) => { downloadFileOperation(req, res, gridFsBucket); });

io.on('connection', (socket) => { connectSocketOperation(socket, io, peerServer); });
peerServer.on('connection', (peer) => { connectPeerOperation(peer, io, peerServer); });

proxyUtil(config.socketPort, config.socketPath, app, server);
proxyUtil(config.peerPort, config.peerPath, app, server);

var main = async () => {
    await mongoose.connect(config.mongoDbUri);

    gridFsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
    File = await mongoose.connection.db.collection('fs.files');

    await deleteAllClients();

    setInterval(async () => {
        var clients = await deleteExpiredClients();

        await disconnectClientsUtil(clients, io, peerServer);
        await notifyAboutExpiredClientsDeletion(clients, io);
    }, 60000);

    await io.listen(config.socketPort);
    await peerServer;

    await server.listen(config.port);

    console.log(`API server is listening on port ${config.port}...`);
};

main();
