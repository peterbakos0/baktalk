import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageReplyOptionUi from '../UiComponents/MessageReplyOptionUi/MessageReplyOptionUi';

class MessageReplyOption extends Component {
    constructor(props) {
        super(props);

        this.reply = this.reply.bind(this);
    }

    static propTypes = {
        messageId: PropTypes.string,
        onReply: PropTypes.func,
        onClose: PropTypes.func
    };

    reply() {
        this.props.onReply(this.props.messageId);
    }

    render() {
        return (<MessageReplyOptionUi onClick={this.reply} onClose={this.props.onClose} />);
    }
}

export default MessageReplyOption;
