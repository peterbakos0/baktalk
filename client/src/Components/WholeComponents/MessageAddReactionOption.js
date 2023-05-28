import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import MessageAddReactionOptionUi from '../UiComponents/MessageAddReactionOptionUi/MessageAddReactionOptionUi';

class MessageAddReactionOption extends Component {
    constructor(props) {
        super(props);

        this.handleError = this.handleError.bind(this);
        this.addReaction = this.addReaction.bind(this);
    }

    static propTypes = {
        messageId: PropTypes.string,
        updateDropdownCanCloseOptions: PropTypes.func,
        onClose: PropTypes.func
    };

    handleError() {
        console.error(new Error());
    }

    async addReaction(emojiUnicode) {
        var success = await client.operations.addReaction(emojiUnicode, this.props.messageId);
        if(!success) { this.handleError(); }
    }

    render() {
        return (
            <MessageAddReactionOptionUi
                onEmojiSelect={this.addReaction}
                updateDropdownCanCloseOptions={this.props.updateDropdownCanCloseOptions}
                onClose={this.props.onClose}
            />
        );
    }
}

export default MessageAddReactionOption;
