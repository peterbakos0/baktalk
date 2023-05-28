import React, { Component } from 'react';
import client from '../../client';
import RoomRoutesUi from '../UiComponents/RoomRoutesUi/RoomRoutesUi';

class RoomRoutes extends Component {
    constructor() {
        super();

        this.init = this.init.bind(this);
        this.uninit = this.uninit.bind(this);
        this.rerender = this.rerender.bind(this);
    }

    init() {
        client.on('change', this.rerender);
    }

    uninit() {
        client.off('change', this.rerender);
    }

    rerender() {
        this.forceUpdate();
    }

    componentWillUnmount() {
        this.uninit();
    }

    componentDidMount() {
        this.init();
    }

    render() {
        var members = client.db.members.find({
            userId: client.auth.credentials.userId
        });

        var roomIds = [];
        for(var i = 0; i < members.length; i++) { roomIds.push(members[i].roomId); }

        return (<RoomRoutesUi roomIds={roomIds} />)
    }
}

export default RoomRoutes;
