import { EventEmitter } from 'events';
import Operations from './Operations';
import Auth from './Auth';
import Db from './Db';
import DbManager from './DbManager';
import Permission from './Permission';
import Utils from './Utils';

class BakTalk extends EventEmitter {
    constructor() {
        super();

        this.reset = this.reset.bind(this);
        this.fullReset = this.fullReset.bind(this);

        this.reset();
    }

    reset() {
        if(this.socket) {
            this.socket.off('disconnect');
            this.socket.disconnect();
        }

        if(this.peer) {
            this.peer.off('disconnected');
            this.peer.disconnect();
        }

        this.socket = null;
        this.peer = null;

        this.operations = new Operations(this);
        this.auth = new Auth(this);
        this.db = new Db();
        this.dbManager = new DbManager(this);
        this.permission = new Permission(this);
        this.utils = new Utils(this);

        this.setMaxListeners(99);

        this.emit('reset');
    }

    fullReset() {
        this.auth.credentials.reset();
        this.reset();
    }
}

export default BakTalk;
