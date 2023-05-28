import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoomBarRoomInvitationMenuMenusUi from '../UiComponents/RoomBarRoomInvitationMenuMenusUi/RoomBarRoomInvitationMenuMenusUi';

class RoomBarRoomInvitationMenuMenus extends Component {
    static propTypes = {
        roomInvitationId: PropTypes.string
    };

    render() {
        return (<RoomBarRoomInvitationMenuMenusUi roomInvitationId={this.props.roomInvitationId} />);
    }
}

export default RoomBarRoomInvitationMenuMenus;
