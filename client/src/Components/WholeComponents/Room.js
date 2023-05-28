import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoomUi from '../UiComponents/RoomUi/RoomUi';

class Room extends Component {
    static propTypes = {
        roomId: PropTypes.string
    };

    render() {
        return (<RoomUi roomId={this.props.roomId} />);
    }
}

export default Room;
