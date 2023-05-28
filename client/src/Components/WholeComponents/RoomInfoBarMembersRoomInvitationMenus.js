import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import RoomInfoBarMembersRoomInvitationMenusUi from '../UiComponents/RoomInfoBarMembersRoomInvitationMenusUi/RoomInfoBarMembersRoomInvitationMenusUi';

class RoomInfoBarMembersRoomInvitationMenus extends Component {
    static propTypes = {
        roomId: PropTypes.string
    };

    render() {
        var roomInvitations = client.db.roomInvitations.find({
            roomId: this.props.roomId
        });

        var roomInvitationIds = [];
        for(var i = 0; i < roomInvitations.length; i++) { roomInvitationIds.push(roomInvitations[i]._id); }

        return (<RoomInfoBarMembersRoomInvitationMenusUi roomInvitationIds={roomInvitationIds} />);
    }
}

export default RoomInfoBarMembersRoomInvitationMenus;
