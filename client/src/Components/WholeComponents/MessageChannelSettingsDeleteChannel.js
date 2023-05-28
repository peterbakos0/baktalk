import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import MessageChannelSettingsDeleteChannelUi from '../UiComponents/MessageChannelSettingsDeleteChannelUi/MessageChannelSettingsDeleteChannelUi';

class MessageChannelSettingsDeleteChannel extends Component {
    constructor(props) {
        super(props);

        this.handleError = this.handleError.bind(this);
        this.deleteChannel = this.deleteChannel.bind(this);

        this.initialState = {
            loading: false
        };

        this.state = this.initialState;
    }

    static propTypes = {
        channelId: PropTypes.string
    };

    handleError() {
        console.error(new Error());
        this.setState(this.initialState);
    }

    async deleteChannel() {
        if(this.state.loading) { return; }

        this.setState({
            loading: true
        });

        var success = await client.operations.deleteChannel(this.props.channelId);
        if(!success) { this.handleError(); }
    }

    render() {
        var hasPermission = client.permission.hasToDeleteChannel(this.props.channelId);

        return (<MessageChannelSettingsDeleteChannelUi hasPermission={hasPermission} loading={this.state.loading} onClick={this.deleteChannel} />);
    }
}

export default MessageChannelSettingsDeleteChannel;
