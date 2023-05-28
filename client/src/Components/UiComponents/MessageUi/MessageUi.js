import shortid from 'shortid';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessageUi.module.css';
import emojifyStringUtil from '../../../utils/emojify-string-util';
import linkifyUtil from '../../../utils/linkify-util';
import MessageEdited from '../../WholeComponents/MessageEdited';
import MessageReplyBar from '../../WholeComponents/MessageReplyBar';
import Avatar from '../../WholeComponents/Avatar';
import MessageShowOptions from '../../WholeComponents/MessageShowOptions';
import MessageFiles from '../../WholeComponents/MessageFiles';
import MessageReactions from '../../WholeComponents/MessageReactions';

class MessageUi extends Component {
    static propTypes = {
        messageId: PropTypes.string,
        text: PropTypes.string,
        authorName: PropTypes.string,
        authorUserId: PropTypes.string,
        timeString: PropTypes.string,
        showAuthor: PropTypes.bool,
        onReply: PropTypes.func,
        onEdit: PropTypes.func
    };

    render() {
        var textContent = emojifyStringUtil(this.props.text, {
            className: style.emoji
        });

        textContent.push(<MessageEdited messageId={this.props.messageId} key={shortid.generate()} />);

        textContent = linkifyUtil(textContent, {
            className: style.link
        });

        var authorName = (this.props.authorName || '[deleted]');

        return (
            <div className={style.wrap}>
                {(
                    this.props.showAuthor ?
                    <div className={style.container}>
                        <MessageReplyBar messageId={this.props.messageId} />
                        <div className={style.bottom}>
                            <Avatar userId={this.props.authorUserId} sizePx={40} />
                            <div className={style.rightBottom}>
                                <div className={style.topRightBottom}>
                                    <div className={style.leftTopRightBottom}>
                                        <label className={style.authorName}>{authorName}</label>
                                        <label className={style.time}>{this.props.timeString}</label>
                                    </div>
                                    <MessageShowOptions
                                        className={style.showOptions}
                                        messageId={this.props.messageId}
                                        onReply={this.props.onReply}
                                        onEdit={this.props.onEdit}
                                    />
                                </div>
                                <label className={style.text}>{textContent}</label>
                                <MessageFiles messageId={this.props.messageId} />
                                <MessageReactions messageId={this.props.messageId} showAuthor={true} />
                            </div>
                        </div>
                    </div> :
                    <div className={style.noAuthorContainer}>
                        <div className={style.top}>
                            <div className={style.leftTop}>
                                <label className={style.noAuthorTime}>{this.props.timeString}</label>
                                <label className={style.noAuthorText}>{textContent}</label>
                            </div>
                            <MessageShowOptions
                                className={style.showOptions}
                                messageId={this.props.messageId}
                                onReply={this.props.onReply}
                                onEdit={this.props.onEdit}
                            />
                        </div>
                        <MessageReactions messageId={this.props.messageId} showAuthor={false} />
                    </div>
                )}
            </div>
        );
    }
}

export default MessageUi;
