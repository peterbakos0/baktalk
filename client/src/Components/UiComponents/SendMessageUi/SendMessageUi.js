import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './SendMessageUi.module.css';
import SendMessageModeBar from '../../WholeComponents/SendMessageModeBar';
import SendMessageForm from '../../WholeComponents/SendMessageForm';

class SendMessageUi extends Component {
    static propTypes = {
        messageParentType: PropTypes.string,
        messageParentId: PropTypes.string,
        mode: PropTypes.string,
        reMessageId: PropTypes.string,
        editMessageId: PropTypes.string,
        onModeReset: PropTypes.func
    };

    render() {
        var mode = this.props.mode;
        if(mode === 'filter') { return null; }

        return (
            <div className={style.wrap}>
                <SendMessageModeBar
                    mode={mode}
                    reMessageId={this.props.reMessageId}
                    editMessageId={this.props.editMessageId}
                    onModeReset={this.props.onModeReset}
                />
                <SendMessageForm
                    messageParentType={this.props.messageParentType}
                    messageParentId={this.props.messageParentId}
                    mode={mode}
                    reMessageId={this.props.reMessageId}
                    editMessageId={this.props.editMessageId}
                    onModeReset={this.props.onModeReset}
                />
            </div>
        );
    }
}

export default SendMessageUi;
