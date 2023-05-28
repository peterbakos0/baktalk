import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomBarRoomInvitationMenusUi.module.css';
import RoomBarRoomInvitationMenu from '../../WholeComponents/RoomBarRoomInvitationMenu';

class RoomBarRoomInvitationMenusUi extends Component {
    static propTypes = {
        roomInvitationIds: (PropTypes.arrayOf(PropTypes.string))
    };

    render() {
        var roomInvitationIds = this.props.roomInvitationIds;

        var menuComponents = [];
        for(var i = 0; i < roomInvitationIds.length; i++) {
            var roomInvitationId = roomInvitationIds[i];
            menuComponents.push(<RoomBarRoomInvitationMenu roomInvitationId={roomInvitationId} key={roomInvitationId} />);
        }

        return (<div className={style.wrap}>{menuComponents}</div>);
    }
}

export default RoomBarRoomInvitationMenusUi;
