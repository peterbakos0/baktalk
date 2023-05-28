import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import MessageReplyBarUi from '../UiComponents/MessageReplyBarUi/MessageReplyBarUi';

class MessageReplyBar extends Component {
    static propTypes = {
        messageId: PropTypes.string
    };

    render() {
        var message = client.db.messages.findById(this.props.messageId);
        var reMessage = (client.db.messages.findById(message.reMessageId) || {});

        var reMessageAuthorName = client.utils.getMessageAuthorName(reMessage._id);
        var isReply = Boolean(reMessage._id);

        return (<MessageReplyBarUi reMessageText={reMessage.text} reMessageAuthorName={reMessageAuthorName} isReply={isReply} />);
    }
}

export default MessageReplyBar;
