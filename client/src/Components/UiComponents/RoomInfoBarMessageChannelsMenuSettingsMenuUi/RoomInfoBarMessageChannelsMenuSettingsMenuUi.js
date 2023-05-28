import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import style from './RoomInfoBarMessageChannelsMenuSettingsMenuUi.module.css';
import getChannelSettingsPath from '../../../utils/path/get-channel-settings-path';
import cogSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/cog-solid-light-icon.png';

class RoomInfoBarMessageChannelsMenuSettingsMenuUi extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    static propTypes = {
        channelId: PropTypes.string,
        roomId: PropTypes.string,
        history: PropTypes.object
    };

    onClick(event) {
        event.preventDefault();

        var channelSettingsPath = getChannelSettingsPath(this.props.channelId, this.props.roomId);
        this.props.history.push(channelSettingsPath);
    }

    render() {
        return (
            <div className={style.wrap} onClick={this.onClick}>
                <img className={style.icon} src={cogSolidLightIcon} />
            </div>
        );
    }
}

RoomInfoBarMessageChannelsMenuSettingsMenuUi = withRouter(RoomInfoBarMessageChannelsMenuSettingsMenuUi);

export default RoomInfoBarMessageChannelsMenuSettingsMenuUi;
