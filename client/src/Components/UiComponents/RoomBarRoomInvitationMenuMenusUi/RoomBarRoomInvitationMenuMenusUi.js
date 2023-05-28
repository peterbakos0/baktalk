import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomBarRoomInvitationMenuMenusUi.module.css';
import RoomBarRoomInvitationMenuAcceptMenu from '../../WholeComponents/RoomBarRoomInvitationMenuAcceptMenu';
import RoomBarRoomInvitationMenuDeleteMenu from '../../WholeComponents/RoomBarRoomInvitationMenuDeleteMenu';

class RoomBarRoomInvitationMenuMenusUi extends Component {
    static propTypes = {
        roomInvitationId: PropTypes.string
    };

    render() {
        return (
            <div className={style.wrap}>
                <RoomBarRoomInvitationMenuAcceptMenu roomInvitationId={this.props.roomInvitationId} />
                <RoomBarRoomInvitationMenuDeleteMenu roomInvitationId={this.props.roomInvitationId} />
            </div>
        );
    }
}

export default RoomBarRoomInvitationMenuMenusUi;
