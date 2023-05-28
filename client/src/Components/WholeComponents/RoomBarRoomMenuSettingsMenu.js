import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoomBarRoomMenuSettingsMenuUi from '../UiComponents/RoomBarRoomMenuSettingsMenuUi/RoomBarRoomMenuSettingsMenuUi';

class RoomBarRoomMenuSettingsMenu extends Component {
    static propTypes = {
        roomId: PropTypes.string
    };

    render() {
        return (<RoomBarRoomMenuSettingsMenuUi roomId={this.props.roomId} />);
    }
}

export default RoomBarRoomMenuSettingsMenu;
