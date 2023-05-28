import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import RoomInfoBarMembersAddUi from '../UiComponents/RoomInfoBarMembersAddUi/RoomInfoBarMembersAddUi';

class RoomInfoBarMembersAdd extends Component {
    constructor(props) {
        super(props);

        this.handleError = this.handleError.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.submit = this.submit.bind(this);

        this.initialState = {
            username: ''
        };

        this.state = this.initialState;
    }

    static propTypes = {
        roomId: PropTypes.string
    };

    handleError() {
        console.error(new Error());
    }

    updateUsername(value) {
        this.setState({
            username: value
        });
    }

    async submit() {
        var username = this.state.username;

        this.setState(this.initialState);

        var success = await client.utils.sendRoomInvitation(this.props.roomId, username);
        if(!success) { this.handleError(); }
    }

    render() {
        var hasPermission = client.permission.hasToSendRoomInvitation(this.props.roomId);

        return (
            <RoomInfoBarMembersAddUi
                username={this.state.username}
                hasPermission={hasPermission}
                onUsernameChange={this.updateUsername}
                onSubmit={this.submit}
            />
        );
    }
}

export default RoomInfoBarMembersAdd;
