import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessageChannelSettingsUi.module.css';
import MessageChannelSettingsForm from '../../WholeComponents/MessageChannelSettingsForm';

class MessageChannelSettingsUi extends Component {
    static propTypes = {
        channelId: PropTypes.string
    };

    render() {
        return (
            <div className={style.wrap}>
                <MessageChannelSettingsForm channelId={this.props.channelId} />
            </div>
        );
    }
}

export default MessageChannelSettingsUi;
