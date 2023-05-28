import React, { Component } from 'react';
import client from '../../client';
import RoomBarRoomMenusUi from '../UiComponents/RoomBarRoomMenusUi/RoomBarRoomMenusUi';

class RoomBarRoomMenus extends Component {
    render() {
        var members = client.db.members.find({
            userId: client.auth.credentials.userId
        });

        var roomIds = [];
        for(var i = 0; i < members.length; i++) { roomIds.push(members[i].roomId); }

        return (<RoomBarRoomMenusUi roomIds={roomIds} />);
    }
}

export default RoomBarRoomMenus;
