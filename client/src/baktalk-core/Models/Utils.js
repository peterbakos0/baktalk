class Utils {
    constructor(client) {
        this.client = client;

        this.isUserOnline = this.isUserOnline.bind(this);
        this.getMemberName = this.getMemberName.bind(this);
        this.getAuthorIdInMessageContext = this.getAuthorIdInMessageContext.bind(this);
        this.getAuthorName = this.getAuthorName.bind(this);
        this.getAuthorUserId = this.getAuthorUserId.bind(this);
        this.getMessageAuthorName = this.getMessageAuthorName.bind(this);
        this.getMessageAuthorUserId = this.getMessageAuthorUserId.bind(this);
        this.getReactionAuthorName = this.getReactionAuthorName.bind(this);
        this.sendFriendRequest = this.sendFriendRequest.bind(this);
        this.startDirectMessaging = this.startDirectMessaging.bind(this);
        this.updateRoom = this.updateRoom.bind(this);
        this.sendRoomInvitation = this.sendRoomInvitation.bind(this);
        this.updateMember = this.updateMember.bind(this);
        this.updateChannel = this.updateChannel.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    isUserOnline(userId) {
        var result = this.client.db.clients.exists({
            socketId: {
                $ne: null
            },
            peerId: {
                $ne: null
            },
            userId: userId
        });

        return result;
    }

    getMemberName(memberId) {
        var result = null;

        var member = (this.client.db.members.findById(memberId) || {});

        if(member.name === null) {
            var user = this.client.db.users.findById(member.userId);
            result = user.username;
        }
        else {
            result = member.name;
        }

        return result;
    }

    getAuthorIdInMessageContext(messageId) {
        var result = null;

        var message = (this.client.db.messages.findById(messageId) || {});

        if(message.parentType === 'directMessaging') {
            result = this.client.auth.credentials.userId;
        }
        else if(message.parentType === 'channel') {
            var channel = this.client.db.channels.findById(message.parentId);

            var member = this.client.db.members.findOne({
                userId: this.client.auth.credentials.userId,
                roomId: channel.roomId
            });

            result = member._id;
        }

        return result;
    }

    getAuthorName(authorId, messageParentType) {
        var result = null;

        if(messageParentType === 'directMessaging') {
            var user = this.client.db.users.findById(authorId);
            result = user.username;
        }
        else if(messageParentType === 'channel') {
            result = this.getMemberName(authorId);
        }

        return result;
    }

    getAuthorUserId(authorId, messageParentType) {
        var result = null;

        if(messageParentType === 'directMessaging') {
            result = authorId;
        }
        else if(messageParentType === 'channel') {
            var member = (this.client.db.members.findById(authorId) || {});
            result = member.userId;
        }

        return result;
    }

    getMessageAuthorName(messageId) {
        var message = (this.client.db.messages.findById(messageId) || {});

        var result = this.getAuthorName(message.authorId, message.parentType);
        return result;
    }

    getMessageAuthorUserId(messageId) {
        var message = (this.client.db.messages.findById(messageId) || {});

        var result = this.getAuthorUserId(message.authorId, message.parentType);
        return result;
    }

    getReactionAuthorName(reactionId) {
        var reaction = (this.client.db.reactions.findById(reactionId) || {});
        var message = (this.client.db.messages.findById(reaction.messageId) || {});

        var result = this.getAuthorName(reaction.authorId, message.parentType);
        return result;
    }

    async sendFriendRequest(username) {
        var receiverUserId = await this.client.operations.getUserId(username);
        if(!receiverUserId) { return false; }

        var success = await this.client.operations.sendFriendRequest(receiverUserId);
        if(!success) { return false; }

        return true;
    }

    async startDirectMessaging(username) {
        var userId = await this.client.operations.getUserId(username);
        if(!userId) { return false; }

        var success = await this.client.operations.startDirectMessaging(userId);
        if(!success) { return false; }

        return true;
    }

    async updateRoom(roomId, newRoomName, newIconFile) {
        var roomName;
        var iconFileId;

        var room = this.client.db.rooms.findById(roomId);

        if(newRoomName && (room.name !== newRoomName)) { roomName = newRoomName; }

        if(newIconFile) {
            iconFileId = await this.client.operations.uploadFile(newIconFile);
            if(!iconFileId) { return false; }

            var success = await this.client.operations.addFile(iconFileId, 'room', room._id);
            if(!success) { return false; }
        }

        if(!roomName && !iconFileId) { return true; }

        var success = await this.client.operations.updateRoom(room._id, roomName, iconFileId);
        if(!success) { return false; }

        return true;
    }

    async sendRoomInvitation(roomId, receiverUsername) {
        var receiverUserId = await this.client.operations.getUserId(receiverUsername);
        if(!receiverUserId) { return false; }

        var success = await this.client.operations.sendRoomInvitation(roomId, receiverUserId);
        if(!success) { return false; }

        return true;
    }

    async updateMember(memberId, newMemberName, newMemberIsAdmin) {
        var memberName;
        var role;

        var member = this.client.db.members.findById(memberId);

        if(newMemberName.length <= 0) { newMemberName = null; }
        if(member.name !== newMemberName) { memberName = newMemberName; }

        var newRole;

        if(newMemberIsAdmin === true) { newRole = 'admin'; }
        else if(newMemberIsAdmin === false) { newRole = 'member'; }

        if(newRole && (member.role !== newRole)) { role = newRole; }

        if((memberName === undefined) && !role) { return true; }

        var success = await this.client.operations.updateMember(memberId, memberName, role);
        if(!success) { return false; }

        return true;
    }

    async updateChannel(channelId, newChannelName) {
        var channelName;

        var channel = this.client.db.channels.findById(channelId);

        if(newChannelName && (channel.name !== newChannelName)) { channelName = newChannelName; }

        if(!channelName) { return true; }

        var success = await this.client.operations.updateChannel(channel._id, channelName);
        if(!success) { return false; }

        return true;
    }

    async sendMessage(messageText, files, reMessageId, messageParentType, messageParentId) {
        var fileIds = [];
        for(var i = 0; i < files.length; i++) {
            var file = files[i];

            var fileId = await this.client.operations.uploadFile(file);
            if(!fileId) { return false; }

            var fileParentType;
            var fileParentId;

            if(messageParentType === 'directMessaging') {
                fileParentType = 'directMessaging';
                fileParentId = messageParentId;
            }
            else if(messageParentType === 'channel') {
                var channel = this.client.db.channels.findById(messageParentId);

                fileParentType = 'room';
                fileParentId = channel.roomId;
            }

            var success = await this.client.operations.addFile(fileId, fileParentType, fileParentId);
            if(!success) { return false; }

            fileIds.push(fileId);
        }

        var success = await this.client.operations.sendMessage(messageText, fileIds, reMessageId, messageParentType, messageParentId);
        if(!success) { return false; }

        return true;
    }
}

export default Utils;
