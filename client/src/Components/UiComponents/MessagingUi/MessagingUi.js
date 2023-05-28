import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessagingUi.module.css';
import MessagingTopBar from '../../WholeComponents/MessagingTopBar';
import MessagingHistory from '../../WholeComponents/MessagingHistory';
import SendMessage from '../../WholeComponents/SendMessage';

class MessagingUi extends Component {
    static propTypes = {
        messageParentType: PropTypes.string,
        messageParentId: PropTypes.string,
        mode: PropTypes.string,
        reMessageId: PropTypes.string,
        editMessageId: PropTypes.string,
        extraFilter: PropTypes.object,
        onMessageReply: PropTypes.func,
        onMessageEdit: PropTypes.func,
        onMessagesFilter: PropTypes.func,
        onModeReset: PropTypes.func
    };

    render() {
        return (
            <div className={style.wrap}>
                <MessagingTopBar
                    messageParentType={this.props.messageParentType}
                    messageParentId={this.props.messageParentId}
                    mode={this.props.mode}
                    extraFilter={this.props.extraFilter}
                    onMessagesFilter={this.props.onMessagesFilter}
                    onModeReset={this.props.onModeReset}
                />
                <MessagingHistory
                    messageParentType={this.props.messageParentType}
                    messageParentId={this.props.messageParentId}
                    mode={this.props.mode}
                    extraFilter={this.props.extraFilter}
                    onMessageReply={this.props.onMessageReply}
                    onMessageEdit={this.props.onMessageEdit}
                />
                <SendMessage
                    messageParentType={this.props.messageParentType}
                    messageParentId={this.props.messageParentId}
                    mode={this.props.mode}
                    reMessageId={this.props.reMessageId}
                    editMessageId={this.props.editMessageId}
                    onModeReset={this.props.onModeReset}
                />
            </div>
        );
    }
}

export default MessagingUi;
