import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SendMessageUi from '../UiComponents/SendMessageUi/SendMessageUi';

class SendMessage extends Component {
    static propTypes = {
        messageParentType: PropTypes.string,
        messageParentId: PropTypes.string,
        mode: PropTypes.string,
        reMessageId: PropTypes.string,
        editMessageId: PropTypes.string,
        onModeReset: PropTypes.func
    };

    render() {
        return (
            <SendMessageUi
                messageParentType={this.props.messageParentType}
                messageParentId={this.props.messageParentId}
                mode={this.props.mode}
                reMessageId={this.props.reMessageId}
                editMessageId={this.props.editMessageId}
                onModeReset={this.props.onModeReset}
            />
        );
    }
}

export default SendMessage;
