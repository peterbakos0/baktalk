import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import RoomBarRoomInvitationMenuUi from '../UiComponents/RoomBarRoomInvitationMenuUi/RoomBarRoomInvitationMenuUi';

class RoomBarRoomInvitationMenu extends Component {
    static propTypes = {
        roomInvitationId: PropTypes.string
    };

    render() {
        var roomInvitation = client.db.roomInvitations.findById(this.props.roomInvitationId);
        var room = client.db.rooms.findById(roomInvitation.roomId);

        return (<RoomBarRoomInvitationMenuUi roomInvitationId={roomInvitation._id} roomId={room._id} roomName={room.name} />);
    }
}

export default RoomBarRoomInvitationMenu;
