import crypto from 'crypto';
import Credentials from './Credentials';

class Auth {
    constructor(client) {
        this.client = client;

        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.logout = this.logout.bind(this);
        this.onClientDisconnect = this.onClientDisconnect.bind(this);

        this.timeout = null;
        this.clientToken = null;
        this.credentials = new Credentials();
    }

    async register(emailAddress, username, password) {
        var passwordHash = crypto
            .createHash('sha256')
            .update(password)
            .digest('hex');

        var success = await this.client.operations.register(emailAddress, username, passwordHash);
        if(!success) { return false; }

        return true;
    }

    async login(username, password) {
        var credentialsExists = this.credentials.exists();
        if(!credentialsExists) {
            var userId = await this.client.operations.getUserId(username);
            if(!userId) { return false; }

            var passwordHash = crypto
                .createHash('sha256')
                .update(password)
                .digest('hex');

            this.credentials.set(userId, passwordHash);
        }

        var clientToken = await this.client.operations.login(this.credentials.userId, this.credentials.passwordHash);
        if(!clientToken) { return false; }

        this.clientToken = clientToken;

        var socket = await this.client.operations.connectSocket();
        if(!socket) { return false; }

        socket.on('user-data-change', () => { this.client.dbManager.updateUserData(); });
        socket.on('message-change', (data) => { this.client.dbManager.updateMessages(data.messageIds); });
        socket.on('reaction-change', (data) => { this.client.dbManager.updateReactions(data.reactionIds); });

        socket.on('disconnect', this.onClientDisconnect);

        this.client.socket = socket;

        var peer = await this.client.operations.connectPeer();
        if(!peer) { return false; }

        peer.on('disconnected', this.onClientDisconnect);

        this.client.peer = peer;

        this.client.emit('change');

        return true;
    }

    async updateUser(newEmailAddress, newUsername, newPassword, newAvatarFile) {
        var emailAddress;
        var username;
        var passwordHash;
        var avatarFileId;

        var user = this.client.db.users.findById(this.credentials.userId);

        if(newEmailAddress && (user.emailAddress !== newEmailAddress)) { emailAddress = newEmailAddress; }
        if(newUsername && (user.username !== newUsername)) { username = newUsername; }

        if(newPassword && (newPassword.length > 0)) {
            passwordHash = crypto
                .createHash('sha256')
                .update(newPassword)
                .digest('hex');
        }

        if(newAvatarFile) {
            avatarFileId = await this.client.operations.uploadFile(newAvatarFile);
            if(!avatarFileId) { return false; }
        }

        if(!emailAddress && !username && !passwordHash && !avatarFileId) { return true; }

        var success = await this.client.operations.updateUser(emailAddress, username, passwordHash, avatarFileId);
        if(!success) { return false; }

        if(passwordHash) { this.credentials.set(user._id, passwordHash); }

        return true;
    }

    async deleteUser() {
        var success = await this.client.operations.deleteUser();
        if(!success) { return false; }

        this.logout();

        return true;
    }

    logout() {
        this.client.fullReset();
    }

    onClientDisconnect() {
        if(this.timeout) { clearTimeout(this.timeout); }
        this.timeout = setTimeout(() => { this.client.reset(); }, 1000);
    }
}

export default Auth;
