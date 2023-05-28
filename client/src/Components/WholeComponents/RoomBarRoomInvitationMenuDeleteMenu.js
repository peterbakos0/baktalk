import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import RoomBarRoomInvitationMenuDeleteMenuUi from '../UiComponents/RoomBarRoomInvitationMenuDeleteMenuUi/RoomBarRoomInvitationMenuDeleteMenuUi';

class RoomBarRoomInvitationMenuDeleteMenu extends Component {
    constructor(props) {
        super(props);

        this.handleError = this.handleError.bind(this);
        this.deleteRoomInvitation = this.deleteRoomInvitation.bind(this);
    }

    static propTypes = {
        roomInvitationId: PropTypes.string
    };

    handleError() {
        console.error(new Error());
    }

    async deleteRoomInvitation() {
        var success = await client.operations.deleteRoomInvitation(this.props.roomInvitationId);
        if(!success) { this.handleError(); }
    }

    render() {
        return (<RoomBarRoomInvitationMenuDeleteMenuUi onClick={this.deleteRoomInvitation} />);
    }
}

export default RoomBarRoomInvitationMenuDeleteMenu;
