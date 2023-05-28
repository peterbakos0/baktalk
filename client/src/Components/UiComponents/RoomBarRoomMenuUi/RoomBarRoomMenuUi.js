import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomBarRoomMenuUi.module.css';
import getRoomPath from '../../../utils/path/get-room-path';
import SideBarMenu from '../../WholeComponents/SideBarMenu';
import RoomIcon from '../../WholeComponents/RoomIcon';
import RoomBarRoomMenuMenus from '../../WholeComponents/RoomBarRoomMenuMenus';

class RoomBarRoomMenuUi extends Component {
    static propTypes = {
        roomId: PropTypes.string,
        roomName: PropTypes.string
    };

    render() {
        var roomPath = getRoomPath(this.props.roomId);
        var selected = window.location.pathname.startsWith(roomPath);

        return (
            <div className={style.wrap}>
                <SideBarMenu text={this.props.roomName} selected={selected}>
                    <RoomIcon roomId={this.props.roomId} sizePx={32} />
                    <RoomBarRoomMenuMenus className={style.menus} roomId={this.props.roomId} />
                </SideBarMenu>
            </div>
        );
    }
}

export default RoomBarRoomMenuUi;
