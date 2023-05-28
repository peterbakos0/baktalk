import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import MessageCopyOptionUi from '../UiComponents/MessageCopyOptionUi/MessageCopyOptionUi';

class MessageCopyOption extends Component {
    static propTypes = {
        messageId: PropTypes.string,
        onClose: PropTypes.func
    };

    render() {
        var message = client.db.messages.findById(this.props.messageId);

        return (<MessageCopyOptionUi messageText={message.text} onClose={this.props.onClose} />);
    }
}

export default MessageCopyOption;
