import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import getTimeStringUtil from '../../utils/get-time-string-util';
import MessageUi from '../UiComponents/MessageUi/MessageUi';

class Message extends Component {
    static propTypes = {
        messageId: PropTypes.string,
        showAuthor: PropTypes.bool,
        onReply: PropTypes.func,
        onEdit: PropTypes.func
    };

    render() {
        var message = client.db.messages.findById(this.props.messageId);

        var messageAuthorName = client.utils.getMessageAuthorName(message._id);
        var messageAuthorUserId = client.utils.getMessageAuthorUserId(message._id);

        var messageDateObject = new Date(message.date);
        var messageTimeString = getTimeStringUtil(messageDateObject);

        return (
            <MessageUi
                messageId={message._id}
                text={message.text}
                authorName={messageAuthorName}
                authorUserId={messageAuthorUserId}
                timeString={messageTimeString}
                showAuthor={this.props.showAuthor}
                onReply={this.props.onReply}
                onEdit={this.props.onEdit}
            />
        );
    }
}

export default Message;
