import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessageReactionUi.module.css';

class MessageReactionUi extends Component {
    static propTypes = {
        emojiImage: PropTypes.string,
        count: PropTypes.number,
        details: PropTypes.string,
        addedReaction: PropTypes.bool,
        onClick: PropTypes.func
    };

    render() {
        return (
            <div
                className={(style.wrap + ' ' + (this.props.addedReaction ? style.addedReaction : style.notAddedReaction))}
                title={this.props.details}
                onClick={this.props.onClick}
            >
                <img className={style.emoji} src={this.props.emojiImage} />
                <label className={style.count}>{this.props.count}</label>
            </div>
        );
    }
}

export default MessageReactionUi;
