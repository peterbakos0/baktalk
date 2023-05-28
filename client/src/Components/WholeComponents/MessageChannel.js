import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageChannelUi from '../UiComponents/MessageChannelUi/MessageChannelUi';

class MessageChannel extends Component {
    static propTypes = {
        channelId: PropTypes.string
    };

    render() {
        return (<MessageChannelUi channelId={this.props.channelId} />);
    }
}

export default MessageChannel;
