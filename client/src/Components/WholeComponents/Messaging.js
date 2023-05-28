import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessagingUi from '../UiComponents/MessagingUi/MessagingUi';

class Messaging extends Component {
    constructor(props) {
        super(props);

        this.replyMessage = this.replyMessage.bind(this);
        this.editMessage = this.editMessage.bind(this);
        this.filterMessages = this.filterMessages.bind(this);
        this.resetMode = this.resetMode.bind(this);

        this.state = {
            mode: 'send',
            reMessageId: null,
            editMessageId: null,
            extraFilter: null
        };
    }

    static propTypes = {
        messageParentType: PropTypes.string,
        messageParentId: PropTypes.string
    };

    replyMessage(messageId) {
        this.setState({
            mode: 'reply',
            reMessageId: messageId
        });
    }

    editMessage(messageId) {
        this.setState({
            mode: 'edit',
            editMessageId: messageId
        });
    }

    filterMessages(extraFilter) {
        this.setState({
            mode: 'filter',
            extraFilter: extraFilter
        });
    }

    resetMode() {
        this.setState({
            mode: 'send'
        });
    }

    render() {
        return (
            <MessagingUi
                messageParentType={this.props.messageParentType}
                messageParentId={this.props.messageParentId}
                mode={this.state.mode}
                reMessageId={this.state.reMessageId}
                editMessageId={this.state.editMessageId}
                extraFilter={this.state.extraFilter}
                onMessageReply={this.replyMessage}
                onMessageEdit={this.editMessage}
                onMessagesFilter={this.filterMessages}
                onModeReset={this.resetMode}
            />
        );
    }
}

export default Messaging;
