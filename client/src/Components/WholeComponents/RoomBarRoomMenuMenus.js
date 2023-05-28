import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoomBarRoomMenuMenusUi from '../UiComponents/RoomBarRoomMenuMenusUi/RoomBarRoomMenuMenusUi';

class RoomBarRoomMenuMenus extends Component {
    static propTypes = {
        className: PropTypes.string,
        roomId: PropTypes.string
    };

    render() {
        return (<RoomBarRoomMenuMenusUi className={this.props.className} roomId={this.props.roomId} />);
    }
}

export default RoomBarRoomMenuMenus;
