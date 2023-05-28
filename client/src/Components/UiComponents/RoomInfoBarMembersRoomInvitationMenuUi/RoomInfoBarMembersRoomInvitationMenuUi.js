import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomInfoBarMembersRoomInvitationMenuUi.module.css';
import SideBarMenu from '../../WholeComponents/SideBarMenu';
import Avatar from '../../WholeComponents/Avatar';
import RoomInfoBarMembersRoomInvitationMenuMenus from '../../WholeComponents/RoomInfoBarMembersRoomInvitationMenuMenus';

class RoomInfoBarMembersRoomInvitationMenuUi extends Component {
    static propTypes = {
        roomInvitationId: PropTypes.string,
        userId: PropTypes.string,
        username: PropTypes.string,
        userIsOnline: PropTypes.bool
    };

    render() {
        return (
            <div className={style.wrap}>
                <SideBarMenu text={this.props.username} online={this.props.userIsOnline}>
                    <Avatar userId={this.props.userId} sizePx={32} />
                    <RoomInfoBarMembersRoomInvitationMenuMenus roomInvitationId={this.props.roomInvitationId} />
                </SideBarMenu>
            </div>
        );
    }
}

export default RoomInfoBarMembersRoomInvitationMenuUi;
