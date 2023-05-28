import React, { Component } from 'react';
import client from '../../client';
import RoomBarRoomInvitationMenusUi from '../UiComponents/RoomBarRoomInvitationMenusUi/RoomBarRoomInvitationMenusUi';

class RoomBarRoomInvitationMenus extends Component {
    render() {
        var roomInvitations = client.db.roomInvitations.find({
            receiverUserId: client.auth.credentials.userId
        });

        var roomInvitationIds = [];
        for(var i = 0; i < roomInvitations.length; i++) { roomInvitationIds.push(roomInvitations[i]._id); }

        return (<RoomBarRoomInvitationMenusUi roomInvitationIds={roomInvitationIds} />);
    }
}

export default RoomBarRoomInvitationMenus;
