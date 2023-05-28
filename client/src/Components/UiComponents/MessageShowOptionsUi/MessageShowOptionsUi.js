import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessageShowOptionsUi.module.css';
import ellipsisHSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/ellipsis-h-solid-light-icon.png';
import MessageOptions from '../../WholeComponents/MessageOptions';

class MessageShowOptionsUi extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onMessageOptionsClose = this.onMessageOptionsClose.bind(this);

        this.state = {
            event: null
        };
    }

    static propTypes = {
        className: PropTypes.string,
        messageId: PropTypes.string,
        onReply: PropTypes.func,
        onEdit: PropTypes.func
    };

    onClick(event) {
        this.setState({
            event: event
        });
    }

    onMessageOptionsClose() {
        this.setState({
            event: null
        });
    }

    render() {
        return (
            <div className={style.wrap}>
                <img className={(style.icon + ' ' + this.props.className)} src={ellipsisHSolidLightIcon} onClick={this.onClick} />
                <MessageOptions
                    messageId={this.props.messageId}
                    event={this.state.event}
                    onReply={this.props.onReply}
                    onEdit={this.props.onEdit}
                    onClose={this.onMessageOptionsClose}
                />
            </div>
        );
    }
}

export default MessageShowOptionsUi;
