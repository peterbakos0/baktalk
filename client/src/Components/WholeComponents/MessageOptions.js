import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageOptionsUi from '../UiComponents/MessageOptionsUi/MessageOptionsUi';

class MessageOptions extends Component {
    static propTypes = {
        messageId: PropTypes.string,
        event: PropTypes.object,
        onReply: PropTypes.func,
        onEdit: PropTypes.func,
        onClose: PropTypes.func
    };

    render() {
        return (
            <MessageOptionsUi
                messageId={this.props.messageId}
                event={this.props.event}
                onReply={this.props.onReply}
                onEdit={this.props.onEdit}
                onClose={this.props.onClose}
            />
        );
    }
}

export default MessageOptions;
