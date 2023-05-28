import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import MessageChannelSettingsFormUi from '../UiComponents/MessageChannelSettingsFormUi/MessageChannelSettingsFormUi';

class MessageChannelSettingsForm extends Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.handleError = this.handleError.bind(this);
        this.updateChannelName = this.updateChannelName.bind(this);
        this.load = this.load.bind(this);
        this.submit = this.submit.bind(this);

        this.initialState = {
            channelName: '',
            loading: false
        };

        this.state = this.initialState;
    }

    static propTypes = {
        channelId: PropTypes.string
    };

    init() {
        this.load();
    }

    handleError() {
        console.error(new Error());
        this.load();
    }

    updateChannelName(value) {
        this.setState({
            channelName: value
        });
    }

    load() {
        var channel = client.db.channels.findById(this.props.channelId);

        this.setState(this.initialState);

        this.setState({
            channelName: channel.name
        });
    }

    async submit() {
        if(this.state.loading) { return; }

        this.setState({
            loading: true
        });

        var channelName = this.state.channelName;

        var success = await client.utils.updateChannel(this.props.channelId, channelName);
        if(!success) {
            this.handleError();
            return;
        }

        this.setState({
            loading: false
        });
    }

    componentDidMount() {
        this.init();
    }

    render() {
        var hasPermission = client.permission.hasToUpdateChannel(this.props.channelId);

        return (
            <MessageChannelSettingsFormUi
                channelId={this.props.channelId}
                channelName={this.state.channelName}
                hasPermission={hasPermission}
                loading={this.state.loading}
                onChannelNameChange={this.updateChannelName}
                onSubmit={this.submit}
            />
        );
    }
}

export default MessageChannelSettingsForm;
