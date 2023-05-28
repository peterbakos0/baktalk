class Permission {
    constructor(client) {
        this.client = client;

        this.hasToAcceptFriendRequest = this.hasToAcceptFriendRequest.bind(this);
        this.hasToUpdateRoom = this.hasToUpdateRoom.bind(this);
        this.hasToDeleteRoom = this.hasToDeleteRoom.bind(this);
        this.hasToSendRoomInvitation = this.hasToSendRoomInvitation.bind(this);
        this.hasToDeleteRoomInvitation = this.hasToDeleteRoomInvitation.bind(this);
        this.hasToCreateChannel = this.hasToCreateChannel.bind(this);
        this.hasToUpdateChannel = this.hasToUpdateChannel.bind(this);
        this.hasToDeleteChannel = this.hasToDeleteChannel.bind(this);
        this.hasToEditMessage = this.hasToEditMessage.bind(this);
        this.hasToDeleteMessage = this.hasToDeleteMessage.bind(this);
        this.hasToUpdateMemberName = this.hasToUpdateMemberName.bind(this);
        this.hasToUpdateRole = this.hasToUpdateRole.bind(this);
        this.hasToKickMember = this.hasToKickMember.bind(this);
    }

    hasToAcceptFriendRequest(friendRequestId) {
        var credentialsExists = this.client.auth.credentials.exists();
        if(!credentialsExists) { return false; }

        var userIsReceiverOfFriendRequest = this.client.db.friendRequests.exists({
            _id: friendRequestId,
            receiverUserId: this.client.auth.credentials.userId
        });
        if(!userIsReceiverOfFriendRequest) { return false; }

        return true;
    }

    hasToUpdateRoom(roomId) {
        var credentialsExists = this.client.auth.credentials.exists();
        if(!credentialsExists) { return false; }

        var userHasAdminRoleInRoom = this.client.db.members.exists({
            role: 'admin',
            userId: this.client.auth.credentials.userId,
            roomId: roomId
        });
        if(!userHasAdminRoleInRoom) { return false; }

        return true;
    }

    hasToDeleteRoom(roomId) {
        var credentialsExists = this.client.auth.credentials.exists();
        if(!credentialsExists) { return false; }

        var userHasAdminRoleInRoom = this.client.db.members.exists({
            role: 'admin',
            userId: this.client.auth.credentials.userId,
            roomId: roomId
        });
        if(!userHasAdminRoleInRoom) { return false; }

        return true;
    }

    hasToSendRoomInvitation(roomId) {
        var credentialsExists = this.client.auth.credentials.exists();
        if(!credentialsExists) { return false; }

        var userHasAdminRoleInRoom = this.client.db.members.exists({
            role: 'admin',
            userId: this.client.auth.credentials.userId,
            roomId: roomId
        });
        if(!userHasAdminRoleInRoom) { return false; }

        return true;
    }

    hasToDeleteRoomInvitation(roomInvitationId) {
        var credentialsExists = this.client.auth.credentials.exists();
        if(!credentialsExists) { return false; }

        var roomInvitation = this.client.db.roomInvitations.findById(roomInvitationId);
        if(!roomInvitation) { return false; }

        if(roomInvitation.receiverUserId !== this.client.auth.credentials.userId) {
            var userHasAdminRoleInRoom = this.client.db.members.exists({
                role: 'admin',
                userId: this.client.auth.credentials.userId,
                roomId: roomInvitation.roomId
            });
            if(!userHasAdminRoleInRoom) { return false; }
        }

        return true;
    }

    hasToCreateChannel(roomId) {
        var credentialsExists = this.client.auth.credentials.exists();
        if(!credentialsExists) { return false; }

        var userHasAdminRoleInRoom = this.client.db.members.exists({
            role: 'admin',
            userId: this.client.auth.credentials.userId,
            roomId: roomId
        });
        if(!userHasAdminRoleInRoom) { return false; }

        return true;        
    }

    hasToUpdateChannel(channelId) {
        var credentialsExists = this.client.auth.credentials.exists();
        if(!credentialsExists) { return false; }

        var channel = this.client.db.channels.findById(channelId);
        if(!channel) { return false; }

        var userHasAdminRoleInRoom = this.client.db.members.exists({
            role: 'admin',
            userId: this.client.auth.credentials.userId,
            roomId: channel.roomId
        });
        if(!userHasAdminRoleInRoom) { return false; }

        return true;
    }

    hasToDeleteChannel(channelId) {
        var credentialsExists = this.client.auth.credentials.exists();
        if(!credentialsExists) { return false; }

        var channel = this.client.db.channels.findById(channelId);
        if(!channel) { return false; }

        var userHasAdminRoleInRoom = this.client.db.members.exists({
            role: 'admin',
            userId: this.client.auth.credentials.userId,
            roomId: channel.roomId
        });
        if(!userHasAdminRoleInRoom) { return false; }

        return true;
    }

    hasToEditMessage(messageId) {
        var credentialsExists = this.client.auth.credentials.exists();
        if(!credentialsExists) { return false; }

        var message = this.client.db.messages.findById(messageId);
        if(!message) { return false; }

        if(message.parentType === 'directMessaging') {
            if(message.authorId !== this.client.auth.credentials.userId) { return false; }
        }
        else if(message.parentType === 'channel') {
            var userIsAuthorOfMessage = this.client.db.members.exists({
                _id: message.authorId,
                userId: this.client.auth.credentials.userId
            });
            if(!userIsAuthorOfMessage) { return false; }
        }

        return true;
    }

    hasToDeleteMessage(messageId) {
        var credentialsExists = this.client.auth.credentials.exists();
        if(!credentialsExists) { return false; }

        var message = this.client.db.messages.findById(messageId);
        if(!message) { return false; }

        if(message.parentType === 'directMessaging') {
            if(message.authorId !== this.client.auth.credentials.userId) { return false; }
        }
        else if(message.parentType === 'channel') {
            var userIsAuthorOfMessage = this.client.db.members.exists({
                _id: message.authorId,
                userId: this.client.auth.credentials.userId
            });

            if(!userIsAuthorOfMessage) {
                var channel = this.client.db.channels.findById(message.parentId);

                var userHasAdminRoleInRoom = this.client.db.members.exists({
                    role: 'admin',
                    userId: this.client.auth.credentials.userId,
                    roomId: channel.roomId
                });
                if(!userHasAdminRoleInRoom) { return false; }
            }
        }

        return true;
    }

    hasToUpdateMemberName(memberId) {
        var credentialsExists = this.client.auth.credentials.exists();
        if(!credentialsExists) { return false; }

        var member = this.client.db.members.findById(memberId);
        if(!member) { return false; }

        if(member.userId !== this.client.auth.credentials.userId) {
            var userHasAdminRoleInRoom = this.client.db.members.exists({
                role: 'admin',
                userId: this.client.auth.credentials.userId,
                roomId: member.roomId
            });
            if(!userHasAdminRoleInRoom) { return false; }
        }

        return true;
    }

    hasToUpdateRole(memberId) {
        var credentialsExists = this.client.auth.credentials.exists();
        if(!credentialsExists) { return false; }

        var member = this.client.db.members.findById(memberId);
        if(!member) { return false; }

        if(member.userId === this.client.auth.credentials.userId) { return false; }

        var userHasAdminRoleInRoom = this.client.db.members.exists({
            role: 'admin',
            userId: this.client.auth.credentials.userId,
            roomId: member.roomId
        });
        if(!userHasAdminRoleInRoom) { return false; }

        return true;
    }

    hasToKickMember(memberId) {
        var credentialsExists = this.client.auth.credentials.exists();
        if(!credentialsExists) { return false; }

        var member = this.client.db.members.findById(memberId);
        if(!member) { return false; }

        if(member.userId === this.client.auth.credentials.userId) { return false; }

        var userHasAdminRoleInRoom = this.client.db.members.exists({
            role: 'admin',
            userId: this.client.auth.credentials.userId,
            roomId: member.roomId
        });
        if(!userHasAdminRoleInRoom) { return false; }

        return true;
    }
}

export default Permission;
