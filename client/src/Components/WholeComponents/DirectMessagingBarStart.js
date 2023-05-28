import React, { Component } from 'react';
import client from '../../client';
import DirectMessagingBarStartUi from '../UiComponents/DirectMessagingBarStartUi/DirectMessagingBarStartUi';

class DirectMessagingBarStart extends Component {
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

        var success = await client.utils.startDirectMessaging(username);
        if(!success) { this.handleError(); }
    }

    render() {
        return (<DirectMessagingBarStartUi username={this.state.username} onUsernameChange={this.updateUsername} onSubmit={this.submit} />);
    }
}

export default DirectMessagingBarStart;
