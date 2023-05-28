import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import RoomBarRoomMenuUi from '../UiComponents/RoomBarRoomMenuUi/RoomBarRoomMenuUi';

class RoomBarRoomMenu extends Component {
    static propTypes = {
        roomId: PropTypes.string
    };

    render() {
        var room = client.db.rooms.findById(this.props.roomId);

        return (<RoomBarRoomMenuUi roomId={room._id} roomName={room.name} />);
    }
}

export default RoomBarRoomMenu;
