import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './RoomBarRoomMenusUi.module.css';
import getRoomPath from '../../../utils/path/get-room-path';
import RoomBarRoomMenu from '../../WholeComponents/RoomBarRoomMenu';

class RoomBarRoomMenusUi extends Component {
    static propTypes = {
        roomIds: (PropTypes.arrayOf(PropTypes.string))
    };

    render() {
        var roomIds = this.props.roomIds;

        var menuComponents = [];
        for(var i = 0; i < roomIds.length; i++) {
            var roomId = roomIds[i];

            var roomPath = getRoomPath(roomId);

            menuComponents.push(
                <Link className={style.menuLink} to={roomPath} key={roomId}>
                    <RoomBarRoomMenu roomId={roomId} />
                </Link>
            );
        }

        return (<div className={style.wrap}>{menuComponents}</div>);
    }
}

export default RoomBarRoomMenusUi;
