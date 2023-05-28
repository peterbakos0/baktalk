import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomBarListUi.module.css';
import RoomBarRoomInvitationMenus from '../../WholeComponents/RoomBarRoomInvitationMenus';
import RoomBarRoomMenus from '../../WholeComponents/RoomBarRoomMenus';
import Blank from '../../WholeComponents/Blank';

class RoomBarListUi extends Component {
    static propTypes = {
        anyRoomInvitationsOrRooms: PropTypes.bool
    };

    render() {
        return (
            <div className={style.wrap}>
                <RoomBarRoomInvitationMenus />
                <RoomBarRoomMenus />
                {(this.props.anyRoomInvitationsOrRooms ? null : <Blank />)}
            </div>
        );
    }
}

export default RoomBarListUi;
