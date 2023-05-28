import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import MessageReactionsUi from '../UiComponents/MessageReactionsUi/MessageReactionsUi';

class MessageReactions extends Component {
    static propTypes = {
        messageId: PropTypes.string,
        showAuthor: PropTypes.bool
    };

    render() {
        var reactions = client.db.reactions.find({
            messageId: this.props.messageId
        });

        var emojiUnicodes = [];
        for(var i = 0; i < reactions.length; i++) { emojiUnicodes.push(reactions[i].emojiUnicode); }

        emojiUnicodes = Array.from(new Set(emojiUnicodes));

        return (<MessageReactionsUi emojiUnicodes={emojiUnicodes} messageId={this.props.messageId} showAuthor={this.props.showAuthor} />);
    }
}

export default MessageReactions;
