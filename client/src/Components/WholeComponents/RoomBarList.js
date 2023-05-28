import React, { Component } from 'react';
import client from '../../client';
import RoomBarListUi from '../UiComponents/RoomBarListUi/RoomBarListUi';

class RoomBarList extends Component {
    constructor() {
        super();

        this.init = this.init.bind(this);
        this.uninit = this.uninit.bind(this);
        this.rerender = this.rerender.bind(this);

        this.mounted = false;
    }

    init() {
        client.on('change', this.rerender);
    }

    uninit() {
        client.off('change', this.rerender);
    }

    rerender() {
        if(this.mounted) { this.forceUpdate(); }
    }

    componentWillUnmount() {
        this.mounted = false;
        this.uninit();
    }

    componentDidMount() {
        this.mounted = true;
        this.init();
    }

    render() {
        var roomInvitationCount = client.db.roomInvitations.count({
            receiverUserId: client.auth.credentials.userId
        });

        var memberCount = client.db.members.count({
            userId: client.auth.credentials.userId
        });

        var anyRoomInvitationsOrRooms = Boolean(roomInvitationCount || memberCount);

        return (<RoomBarListUi anyRoomInvitationsOrRooms={anyRoomInvitationsOrRooms} />);
    }
}

export default RoomBarList;
