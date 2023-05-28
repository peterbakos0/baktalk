import Collection from './Collection';

class Db {
    constructor() {
        this.setUserData = this.setUserData.bind(this);

        this.users = new Collection();
        this.friendRequests = new Collection();
        this.friends = new Collection();
        this.directMessagings = new Collection();
        this.rooms = new Collection();
        this.roomInvitations = new Collection();
        this.members = new Collection();
        this.channels = new Collection();
        this.messages = new Collection();
        this.reactions = new Collection();
        this.files = new Collection();
        this.clients = new Collection();

        this.hasUserData = false;
    }

    setUserData(userData) {
        this.users = new Collection(...userData.users);
        this.friendRequests = new Collection(...userData.friendRequests);
        this.friends = new Collection(...userData.friends);
        this.directMessagings = new Collection(...userData.directMessagings);
        this.rooms = new Collection(...userData.rooms);
        this.roomInvitations = new Collection(...userData.roomInvitations);
        this.members = new Collection(...userData.members);
        this.channels = new Collection(...userData.channels);
        this.clients = new Collection(...userData.clients);

        this.hasUserData = true;
    }
}

export default Db;
