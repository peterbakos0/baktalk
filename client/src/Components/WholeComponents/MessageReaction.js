import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import getEmojiByPropUtil from '../../utils/get-emoji-by-prop-util';
import getMessageReactionDetailsUtil from '../../utils/get-message-reaction-details-util';
import MessageReactionUi from '../UiComponents/MessageReactionUi/MessageReactionUi';

class MessageReaction extends Component {
    constructor(props) {
        super(props);

        this.handleError = this.handleError.bind(this);
        this.toggleAddedReaction = this.toggleAddedReaction.bind(this);
    }

    static propTypes = {
        emojiUnicode: PropTypes.string,
        messageId: PropTypes.string
    };

    handleError() {
        console.error(new Error());
    }

    async toggleAddedReaction() {
        var authorId = client.utils.getAuthorIdInMessageContext(this.props.messageId);

        var reaction = client.db.reactions.findOne({
            emojiUnicode: this.props.emojiUnicode,
            authorId: authorId,
            messageId: this.props.messageId
        });

        if(reaction) {
            var success = await client.operations.deleteReaction(reaction._id);
            if(!success) { this.handleError(); }
        }
        else {
            var success = await client.operations.addReaction(this.props.emojiUnicode, this.props.messageId);
            if(!success) { this.handleError(); }
        }
    }

    render() {
        var emoji = getEmojiByPropUtil('unicode', this.props.emojiUnicode);

        var count = client.db.reactions.count({
            emojiUnicode: this.props.emojiUnicode,
            messageId: this.props.messageId
        });

        var details = getMessageReactionDetailsUtil(this.props.emojiUnicode, this.props.messageId);

        var authorId = client.utils.getAuthorIdInMessageContext(this.props.messageId);

        var addedReaction = client.db.reactions.exists({
            emojiUnicode: this.props.emojiUnicode,
            authorId: authorId,
            messageId: this.props.messageId
        });

        return (
            <MessageReactionUi
                emojiImage={emoji.image}
                count={count}
                details={details}
                addedReaction={addedReaction}
                onClick={this.toggleAddedReaction}
            />
        );
    }
}

export default MessageReaction;
