import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomInfoBarMessageChannelsMenuMenusUi.module.css';
import RoomInfoBarMessageChannelsMenuSettingsMenu from '../../WholeComponents/RoomInfoBarMessageChannelsMenuSettingsMenu';

class RoomInfoBarMessageChannelsMenuMenusUi extends Component {
    static propTypes = {
        className: PropTypes.string,
        channelId: PropTypes.string
    };

    render() {
        return (
            <div className={(style.wrap + ' ' + this.props.className)}>
                <RoomInfoBarMessageChannelsMenuSettingsMenu channelId={this.props.channelId} />
            </div>
        );
    }
}

export default RoomInfoBarMessageChannelsMenuMenusUi;
