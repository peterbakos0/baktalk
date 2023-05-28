import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageChannelSettingsUi from '../UiComponents/MessageChannelSettingsUi/MessageChannelSettingsUi';

class MessageChannelSettings extends Component {
    static propTypes = {
        channelId: PropTypes.string
    };

    render() {
        return (<MessageChannelSettingsUi channelId={this.props.channelId} />);
    }
}

export default MessageChannelSettings;
