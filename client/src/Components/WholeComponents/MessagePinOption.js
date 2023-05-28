import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import MessagePinOptionUi from '../UiComponents/MessagePinOptionUi/MessagePinOptionUi';

class MessagePinOption extends Component {
    constructor(props) {
        super(props);

        this.handleError = this.handleError.bind(this);
        this.toggleMessagePinned = this.toggleMessagePinned.bind(this);
    }

    static propTypes = {
        messageId: PropTypes.string,
        onClose: PropTypes.func
    };

    handleError() {
        console.error(new Error());
    }

    async toggleMessagePinned() {
        var message = client.db.messages.findById(this.props.messageId);

        var success = await client.operations.updateMessage(message._id, undefined, !(message.pinned));
        if(!success) { this.handleError(); }
    }

    render() {
        var message = client.db.messages.findById(this.props.messageId);

        return (<MessagePinOptionUi messagePinned={message.pinned} onClick={this.toggleMessagePinned} onClose={this.props.onClose} />);
    }
}

export default MessagePinOption;
