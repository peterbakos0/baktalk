import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import RoomInfoBarMessageChannelsCreateUi from '../UiComponents/RoomInfoBarMessageChannelsCreateUi/RoomInfoBarMessageChannelsCreateUi';

class RoomInfoBarMessageChannelsCreate extends Component {
    constructor(props) {
        super(props);

        this.handleError = this.handleError.bind(this);
        this.updateChannelName = this.updateChannelName.bind(this);
        this.submit = this.submit.bind(this);

        this.initialState = {
            channelName: ''
        };

        this.state = this.initialState;
    }

    static propTypes = {
        roomId: PropTypes.string
    };

    handleError() {
        console.error(new Error());
    }

    updateChannelName(value) {
        this.setState({
            channelName: value
        });
    }

    async submit() {
        var channelName = this.state.channelName;

        this.setState(this.initialState);

        var success = await client.operations.createChannel(channelName, 'message', this.props.roomId);
        if(!success) { this.handleError(); }
    }

    render() {
        var hasPermission = client.permission.hasToCreateChannel(this.props.roomId);

        return (
            <RoomInfoBarMessageChannelsCreateUi
                channelName={this.state.channelName}
                hasPermission={hasPermission}
                onChannelNameChange={this.updateChannelName}
                onSubmit={this.submit}
            />
        );
    }
}

export default RoomInfoBarMessageChannelsCreate;
