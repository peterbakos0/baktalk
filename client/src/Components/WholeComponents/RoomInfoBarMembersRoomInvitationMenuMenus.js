import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoomInfoBarMembersRoomInvitationMenuMenusUi from '../UiComponents/RoomInfoBarMembersRoomInvitationMenuMenusUi/RoomInfoBarMembersRoomInvitationMenuMenusUi';

class RoomInfoBarMembersRoomInvitationMenuMenus extends Component {
    static propTypes = {
        roomInvitationId: PropTypes.string
    };

    render() {
        return (<RoomInfoBarMembersRoomInvitationMenuMenusUi roomInvitationId={this.props.roomInvitationId} />);
    }
}

export default RoomInfoBarMembersRoomInvitationMenuMenus;
