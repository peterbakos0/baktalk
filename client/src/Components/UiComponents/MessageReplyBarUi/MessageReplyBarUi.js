import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessageReplyBarUi.module.css';

class MessageReplyBarUi extends Component {
    static propTypes = {
        reMessageText: PropTypes.string,
        reMessageAuthorName: PropTypes.string,
        isReply: PropTypes.bool
    };

    render() {
        var isReply = this.props.isReply;
        if(!isReply) { return null; }

        var reMessageAuthorName = (this.props.reMessageAuthorName || '[deleted]');

        return (
            <div className={style.wrap}>
                <div className={style.lines}></div>
                <div className={style.right}>
                    <label className={style.reMessageAuthorName}>{reMessageAuthorName}</label>
                    <label className={style.reMessageText}>{this.props.reMessageText}</label>
                </div>
            </div>
        );
    }
}

export default MessageReplyBarUi;
