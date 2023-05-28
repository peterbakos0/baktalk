import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import RoomBarRoomInvitationMenuAcceptMenuUi from '../UiComponents/RoomBarRoomInvitationMenuAcceptMenuUi/RoomBarRoomInvitationMenuAcceptMenuUi';

class RoomBarRoomInvitationMenuAcceptMenu extends Component {
    constructor(props) {
        super(props);

        this.handleError = this.handleError.bind(this);
        this.acceptRoomInvitation = this.acceptRoomInvitation.bind(this);
    }

    static propTypes = {
        roomInvitationId: PropTypes.string
    };

    handleError() {
        console.error(new Error());
    }

    async acceptRoomInvitation() {
        var success = await client.operations.acceptRoomInvitation(this.props.roomInvitationId);
        if(!success) { this.handleError(); }
    }

    render() {
        return (<RoomBarRoomInvitationMenuAcceptMenuUi onClick={this.acceptRoomInvitation} />);
    }
}

export default RoomBarRoomInvitationMenuAcceptMenu;
