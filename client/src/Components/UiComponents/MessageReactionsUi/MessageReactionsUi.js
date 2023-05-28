import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessageReactionsUi.module.css';
import MessageReaction from '../../WholeComponents/MessageReaction';

class MessageReactionsUi extends Component {
    static propTypes = {
        emojiUnicodes: (PropTypes.arrayOf(PropTypes.string)),
        messageId: PropTypes.string,
        showAuthor: PropTypes.bool
    };

    render() {
        var emojiUnicodes = this.props.emojiUnicodes;
        if(emojiUnicodes.length <= 0) { return null; }

        var reactionComponents = [];
        for(var i = 0; i < emojiUnicodes.length; i++) {
            var emojiUnicode = emojiUnicodes[i];
            reactionComponents.push(<MessageReaction emojiUnicode={emojiUnicode} messageId={this.props.messageId} key={emojiUnicode} />);
        }

        return (<div className={(style.wrap + ' ' + (this.props.showAuthor ? style.showAuthor : style.noAuthor))}>{reactionComponents}</div>);
    }
}

export default MessageReactionsUi;
