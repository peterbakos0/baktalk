import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageShowOptionsUi from '../UiComponents/MessageShowOptionsUi/MessageShowOptionsUi';

class MessageShowOptions extends Component {
    static propTypes = {
        className: PropTypes.string,
        messageId: PropTypes.string,
        onReply: PropTypes.func,
        onEdit: PropTypes.func
    };

    render() {
        return (
            <MessageShowOptionsUi
                className={this.props.className}
                messageId={this.props.messageId}
                onReply={this.props.onReply}
                onEdit={this.props.onEdit}
            />
        );
    }
}

export default MessageShowOptions;
