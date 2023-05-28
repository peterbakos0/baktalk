import React, { Component } from 'react';
import client from '../../client';
import FriendBarAddUi from '../UiComponents/FriendBarAddUi/FriendBarAddUi';

class FriendBarAdd extends Component {
    constructor() {
        super();

        this.handleError = this.handleError.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.submit = this.submit.bind(this);

        this.initialState = {
            username: ''
        };

        this.state = this.initialState;
    }

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

        var success = await client.utils.sendFriendRequest(username);
        if(!success) { this.handleError(); }
    }

    render() {
        return (<FriendBarAddUi username={this.state.username} onUsernameChange={this.updateUsername} onSubmit={this.submit} />);
    }
}

export default FriendBarAdd;
