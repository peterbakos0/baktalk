import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import style from './RoomRoutesUi.module.css';
import getRoomsPath from '../../../utils/path/get-rooms-path';
import getRoomPath from '../../../utils/path/get-room-path';
import getRoomSettingsPath from '../../../utils/path/get-room-settings-path';
import RoomSettings from '../../WholeComponents/RoomSettings';
import Room from '../../WholeComponents/Room';
import Blank from '../../WholeComponents/Blank';

class RoomRoutesUi extends Component {
    static propTypes = {
        roomIds: (PropTypes.arrayOf(PropTypes.string))
    };

    render() {
        var roomIds = this.props.roomIds;

        var roomsPath = getRoomsPath();
        var firstRoomPath = getRoomPath(roomIds[0]);

        var routeComponents = [];
        for(var i = 0; i < roomIds.length; i++) {
            var roomId = roomIds[i];

            var roomSettingsPath = getRoomSettingsPath(roomId);
            var roomPath = getRoomPath(roomId);

            routeComponents.push(
                <Route path={roomSettingsPath} key={(roomId + '_settings')}>
                    <RoomSettings roomId={roomId} />
                </Route>
            );

            routeComponents.push(
                <Route path={roomPath} key={roomId}>
                    <Room roomId={roomId} />
                </Route>
            );
        }

        return (
            <div className={style.wrap}>
                <Switch>
                    {routeComponents}
                    <Route
                        path={roomsPath}
                        exact={true}
                        component={(() => (Boolean(roomIds.length) ? <Redirect to={firstRoomPath} /> : <Blank />))}
                    />
                    <Route component={() => (<Redirect to={roomsPath} />)} />
                </Switch>
            </div>
        );
    }
}

export default RoomRoutesUi;
