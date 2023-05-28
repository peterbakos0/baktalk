import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomInfoBarMessageChannelsMenuUi.module.css';
import getChannelPath from '../../../utils/path/get-channel-path';
import commentAltSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/comment-alt-solid-light-icon.png';
import SideBarMenu from '../../WholeComponents/SideBarMenu';
import RoomInfoBarMessageChannelsMenuMenus from '../../WholeComponents/RoomInfoBarMessageChannelsMenuMenus';

class RoomInfoBarMessageChannelsMenuUi extends Component {
    static propTypes = {
        channelId: PropTypes.string,
        channelName: PropTypes.string,
        roomId: PropTypes.string
    };

    render() {
        var channelPath = getChannelPath(this.props.channelId, this.props.roomId);
        var selected = window.location.pathname.startsWith(channelPath);

        return (
            <div className={style.wrap}>
                <SideBarMenu text={this.props.channelName} selected={selected}>
                    <img className={style.icon} src={commentAltSolidLightIcon} />
                    <RoomInfoBarMessageChannelsMenuMenus className={style.menus} channelId={this.props.channelId} />
                </SideBarMenu>
            </div>
        );
    }
}

export default RoomInfoBarMessageChannelsMenuUi;
