import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import RoomIconUi from '../UiComponents/RoomIconUi/RoomIconUi';

class RoomIcon extends Component {
    static propTypes = {
        roomId: PropTypes.string,
        sizePx: PropTypes.number
    };

    render() {
        var room = (client.db.rooms.findById(this.props.roomId) || {});

        return (<RoomIconUi fileId={room.iconFileId} sizePx={this.props.sizePx} />);
    }
}

export default RoomIcon;
