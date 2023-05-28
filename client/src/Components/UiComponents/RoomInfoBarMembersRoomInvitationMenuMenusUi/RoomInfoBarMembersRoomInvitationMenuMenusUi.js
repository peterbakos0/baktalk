import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomInfoBarMembersRoomInvitationMenuMenusUi.module.css';
import RoomInfoBarMembersRoomInvitationMenuDeleteMenu from '../../WholeComponents/RoomInfoBarMembersRoomInvitationMenuDeleteMenu';

class RoomInfoBarMembersRoomInvitationMenuMenusUi extends Component {
    static propTypes = {
        roomInvitationId: PropTypes.string
    };

    render() {
        return (
            <div className={style.wrap}>
                <RoomInfoBarMembersRoomInvitationMenuDeleteMenu roomInvitationId={this.props.roomInvitationId} />
            </div>
        );
    }
}

export default RoomInfoBarMembersRoomInvitationMenuMenusUi;
