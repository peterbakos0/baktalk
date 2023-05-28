import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomBarRoomInvitationMenuUi.module.css';
import SideBarMenu from '../../WholeComponents/SideBarMenu';
import RoomIcon from '../../WholeComponents/RoomIcon';
import RoomBarRoomInvitationMenuMenus from '../../WholeComponents/RoomBarRoomInvitationMenuMenus';

class RoomBarRoomInvitationMenuUi extends Component {
    static propTypes = {
        roomInvitationId: PropTypes.string,
        roomId: PropTypes.string,
        roomName: PropTypes.string
    };

    render() {
        return (
            <div className={style.wrap}>
                <SideBarMenu text={this.props.roomName}>
                    <RoomIcon roomId={this.props.roomId} sizePx={32} />
                    <RoomBarRoomInvitationMenuMenus roomInvitationId={this.props.roomInvitationId} />
                </SideBarMenu>
            </div>
        );
    }
}

export default RoomBarRoomInvitationMenuUi;
