import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomInfoBarMembersListUi.module.css';
import RoomInfoBarMembersRoomInvitationMenus from '../../WholeComponents/RoomInfoBarMembersRoomInvitationMenus';
import RoomInfoBarMembersMemberMenus from '../../WholeComponents/RoomInfoBarMembersMemberMenus';

class RoomInfoBarMembersListUi extends Component {
    static propTypes = {
        roomId: PropTypes.string
    };

    render() {
        return (
            <div className={style.wrap}>
                <RoomInfoBarMembersRoomInvitationMenus roomId={this.props.roomId} />
                <RoomInfoBarMembersMemberMenus roomId={this.props.roomId} />
            </div>
        );
    }
}

export default RoomInfoBarMembersListUi;
