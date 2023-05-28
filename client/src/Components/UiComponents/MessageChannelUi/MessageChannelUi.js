import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessageChannelUi.module.css';
import Messaging from '../../WholeComponents/Messaging';

class MessageChannelUi extends Component {
    static propTypes = {
        channelId: PropTypes.string
    };

    render() {
        return (
            <div className={style.wrap}>
                <Messaging messageParentType='channel' messageParentId={this.props.channelId} />
            </div>
        );
    }
}

export default MessageChannelUi;
