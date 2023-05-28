import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import RoomInfoBarMembersRoomInvitationMenuUi from '../UiComponents/RoomInfoBarMembersRoomInvitationMenuUi/RoomInfoBarMembersRoomInvitationMenuUi';

class RoomInfoBarMembersRoomInvitationMenu extends Component {
    static propTypes = {
        roomInvitationId: PropTypes.string
    };

    render() {
        var roomInvitation = client.db.roomInvitations.findById(this.props.roomInvitationId);
        var user = client.db.users.findById(roomInvitation.receiverUserId);

        var userIsOnline = client.utils.isUserOnline(user._id);

        return (
            <RoomInfoBarMembersRoomInvitationMenuUi
                roomInvitationId={roomInvitation._id}
                userId={user._id}
                username={user.username}
                userIsOnline={userIsOnline}
            />
        );
    }
}

export default RoomInfoBarMembersRoomInvitationMenu;
