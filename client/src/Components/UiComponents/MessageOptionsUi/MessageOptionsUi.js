import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessageOptionsUi.module.css';
import Dropdown from '../../WholeComponents/Dropdown';
import MessageCopyOption from '../../WholeComponents/MessageCopyOption';
import MessageAddReactionOption from '../../WholeComponents/MessageAddReactionOption';
import MessageReplyOption from '../../WholeComponents/MessageReplyOption';
import MessagePinOption from '../../WholeComponents/MessagePinOption';
import MessageEditOption from '../../WholeComponents/MessageEditOption';
import MessageDeleteOption from '../../WholeComponents/MessageDeleteOption';

class MessageOptionsUi extends Component {
    constructor(props) {
        super(props);

        this.updateDropdownCanCloseOptions = this.updateDropdownCanCloseOptions.bind(this);
        this.onDropdownClose = this.onDropdownClose.bind(this);

        this.state = {
            dropdownCanCloseOptions: true
        };
    }

    static propTypes = {
        messageId: PropTypes.string,
        event: PropTypes.object,
        onReply: PropTypes.func,
        onEdit: PropTypes.func,
        onClose: PropTypes.func
    };

    updateDropdownCanCloseOptions(value) {
        this.setState({
            dropdownCanCloseOptions: value
        });
    }

    onDropdownClose() {
        if(this.state.dropdownCanCloseOptions) { this.props.onClose(); }
    }

    render() {
        var event = this.props.event;
        if(!event) { return null; }

        return (
            <div className={style.wrap}>
                <Dropdown event={event} onClose={this.onDropdownClose}>
                    <MessageCopyOption messageId={this.props.messageId} onClose={this.props.onClose} />
                    <MessageAddReactionOption
                        messageId={this.props.messageId}
                        updateDropdownCanCloseOptions={this.updateDropdownCanCloseOptions}
                        onClose={this.props.onClose}
                    />
                    <MessageReplyOption messageId={this.props.messageId} onReply={this.props.onReply} onClose={this.props.onClose} />
                    <MessagePinOption messageId={this.props.messageId} onClose={this.props.onClose} />
                    <MessageEditOption messageId={this.props.messageId} onEdit={this.props.onEdit} onClose={this.props.onClose} />
                    <MessageDeleteOption messageId={this.props.messageId} onClose={this.props.onClose} />
                </Dropdown>
            </div>
        );
    }
}

export default MessageOptionsUi;
