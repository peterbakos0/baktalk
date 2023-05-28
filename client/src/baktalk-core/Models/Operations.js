import axios from 'axios';
import { io } from 'socket.io-client';
import Peer from '../libs/peerjs/peerjs';
import config from '../constants/config';
import getApiUrlUtil from '../utils/get-api-url-util';

class Operations {
    constructor(client) {
        this.client = client;

        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.getUserId = this.getUserId.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.sendFriendRequest = this.sendFriendRequest.bind(this);
        this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
        this.deleteFriendRequest = this.deleteFriendRequest.bind(this);
        this.unfriend = this.unfriend.bind(this);
        this.startDirectMessaging = this.startDirectMessaging.bind(this);
        this.createRoom = this.createRoom.bind(this);
        this.updateRoom = this.updateRoom.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);
        this.sendRoomInvitation = this.sendRoomInvitation.bind(this);
        this.acceptRoomInvitation = this.acceptRoomInvitation.bind(this);
        this.deleteRoomInvitation = this.deleteRoomInvitation.bind(this);
        this.updateMember = this.updateMember.bind(this);
        this.deleteMember = this.deleteMember.bind(this);
        this.createChannel = this.createChannel.bind(this);
        this.updateChannel = this.updateChannel.bind(this);
        this.deleteChannel = this.deleteChannel.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.getMessages = this.getMessages.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
        this.readMessages = this.readMessages.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.addReaction = this.addReaction.bind(this);
        this.getReactions = this.getReactions.bind(this);
        this.deleteReaction = this.deleteReaction.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.addFile = this.addFile.bind(this);
        this.getFiles = this.getFiles.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.connectSocket = this.connectSocket.bind(this);
        this.connectPeer = this.connectPeer.bind(this);
    }

    async register(emailAddress, username, passwordHash) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/register'),
                method: 'POST',
                data: {
                    emailAddress: emailAddress,
                    username: username,
                    passwordHash: passwordHash
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async login(userId, passwordHash) {
        var result = null;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/login'),
                method: 'POST',
                data: {
                    userId: userId,
                    passwordHash: passwordHash
                }
            });

            if(res.data.success) { result = res.data.clientToken; }
        }
        catch(error) {}

        return result;
    }

    async getUserId(username) {
        var result = null;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/get-user-id'),
                method: 'POST',
                data: {
                    username: username
                }
            });

            if(res.data.success) { result = res.data.userId; }
        }
        catch(error) {}

        return result;
    }

    async getUserData() {
        var result = null;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/get-user-data'),
                method: 'GET',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                }
            });

            if(res.data.success) { result = res.data.userData; }
        }
        catch(error) {}

        return result;
    }

    async updateUser(emailAddress, username, passwordHash, avatarFileId) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/update-user'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    emailAddress: emailAddress,
                    username: username,
                    passwordHash: passwordHash,
                    avatarFileId: avatarFileId
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async deleteUser() {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/delete-user'),
                method: 'GET',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async sendFriendRequest(receiverUserId) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/send-friend-request'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    receiverUserId: receiverUserId
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async acceptFriendRequest(friendRequestId) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/accept-friend-request'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    friendRequestId: friendRequestId
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async deleteFriendRequest(friendRequestId) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/delete-friend-request'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    friendRequestId: friendRequestId
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async unfriend(friendId) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/unfriend'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    friendId: friendId
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async startDirectMessaging(userId) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/start-direct-messaging'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    userId: userId
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async createRoom(roomName) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/create-room'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    roomName: roomName
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async updateRoom(roomId, roomName, iconFileId) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/update-room'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    roomId: roomId,
                    roomName: roomName,
                    iconFileId: iconFileId
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async deleteRoom(roomId) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/delete-room'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    roomId: roomId
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async sendRoomInvitation(roomId, receiverUserId) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/send-room-invitation'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    roomId: roomId,
                    receiverUserId: receiverUserId
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async acceptRoomInvitation(roomInvitationId) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/accept-room-invitation'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    roomInvitationId: roomInvitationId
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async deleteRoomInvitation(roomInvitationId) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/delete-room-invitation'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    roomInvitationId: roomInvitationId
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async updateMember(memberId, memberName, role) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/update-member'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    memberId: memberId,
                    memberName: memberName,
                    role: role
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async deleteMember(memberId) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/delete-member'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    memberId: memberId
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async createChannel(channelName, channelType, roomId) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/create-channel'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    channelName: channelName,
                    channelType: channelType,
                    roomId: roomId
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async updateChannel(channelId, channelName) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/update-channel'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    channelId: channelId,
                    channelName: channelName
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async deleteChannel(channelId) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/delete-channel'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    channelId: channelId
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async sendMessage(messageText, fileIds, reMessageId, messageParentType, messageParentId) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/send-message'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    messageText: messageText,
                    fileIds: fileIds,
                    reMessageId: reMessageId,
                    messageParentType: messageParentType,
                    messageParentId: messageParentId
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async getMessages(messageFilter, skip, limit) {
        var result = null;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/get-messages'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    messageFilter: messageFilter,
                    skip: skip,
                    limit: limit
                }
            });

            if(res.data.success) { result = res.data.messages; }
        }
        catch(error) {}

        return result;
    }

    async updateMessage(messageId, messageText, pinned) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/update-message'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    messageId: messageId,
                    messageText: messageText,
                    pinned: pinned
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async readMessages(messageParentType, messageParentId, limit) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/read-messages'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    messageParentType: messageParentType,
                    messageParentId: messageParentId,
                    limit: limit
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async deleteMessage(messageId) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/delete-message'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    messageId: messageId
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async addReaction(emojiUnicode, messageId) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/add-reaction'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    emojiUnicode: emojiUnicode,
                    messageId: messageId
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async getReactions(reactionFilter, skip, limit) {
        var result = null;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/get-reactions'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    reactionFilter: reactionFilter,
                    skip: skip,
                    limit: limit
                }
            });

            if(res.data.success) { result = res.data.reactions; }
        }
        catch(error) {}

        return result;
    }

    async deleteReaction(reactionId) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/delete-reaction'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    reactionId: reactionId
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async uploadFile(file) {
        var result = null;

        try {
            var data = new FormData();
            data.append('file', file);

            var res = await axios({
                url: (getApiUrlUtil() + '/upload-file'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: data
            });

            if(res.data.success) { result = res.data.fileId; }
        }
        catch(error) {}

        return result;
    }

    async addFile(fileId, fileParentType, fileParentId) {
        var result = false;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/add-file'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    fileId: fileId,
                    fileParentType: fileParentType,
                    fileParentId: fileParentId
                }
            });

            if(res.data.success) { result = true; }
        }
        catch(error) {}

        return result;
    }

    async getFiles(fileIds) {
        var result = null;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/get-files'),
                method: 'POST',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                data: {
                    fileIds: fileIds
                }
            });

            if(res.data.success) { result = res.data.files; }
        }
        catch(error) {}

        return result;
    }

    async downloadFile(fileId) {
        var result = null;

        try {
            var res = await axios({
                url: (getApiUrlUtil() + '/download-file/' + fileId),
                method: 'GET',
                headers: {
                    'Client-Token': this.client.auth.clientToken
                },
                responseType: 'blob'
            });

            if(res.status === 200) { result = res.data; }
        }
        catch(error) {}

        return result;
    }

    async connectSocket() {
        var result = null;

        try {
            var socket = io.connect(getApiUrlUtil(), {
                path: '/socket',
                transports: ['websocket'],
                reconnection: false,
                query: {
                    clientToken: this.client.auth.clientToken
                }
            });

            await new Promise((resolve) => { socket.on('connect', resolve); });

            result = socket;
        }
        catch(error) {}

        return result;
    }

    async connectPeer() {
        var result = null;

        try {
            var peer = new Peer({
                host: config.apiHost,
                port: config.apiPort,
                path: '/peer',
                secure: config.apiSecure,
                clientToken: this.client.auth.clientToken
            });

            await new Promise((resolve) => { peer.on('open', resolve); });

            result = peer;
        }
        catch(error) {}

        return result;
    }
}

export default Operations;
