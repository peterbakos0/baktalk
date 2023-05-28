import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import MessageDeleteOptionUi from '../UiComponents/MessageDeleteOptionUi/MessageDeleteOptionUi';

class MessageDeleteOption extends Component {
    constructor(props) {
        super(props);

        this.handleError = this.handleError.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
    }

    static propTypes = {
        messageId: PropTypes.string,
        onClose: PropTypes.func
    };

    handleError() {
        console.error(new Error());
    }

    async deleteMessage() {
        var success = await client.operations.deleteMessage(this.props.messageId);
        if(!success) { this.handleError(); }
    }

    render() {
        var hasPermission = client.permission.hasToDeleteMessage(this.props.messageId);

        return (<MessageDeleteOptionUi hasPermission={hasPermission} onClick={this.deleteMessage} onClose={this.props.onClose} />);
    }
}

export default MessageDeleteOption;
