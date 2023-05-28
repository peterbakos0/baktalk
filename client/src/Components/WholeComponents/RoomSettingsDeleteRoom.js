import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import RoomSettingsDeleteRoomUi from '../UiComponents/RoomSettingsDeleteRoomUi/RoomSettingsDeleteRoomUi';

class RoomSettingsDeleteRoom extends Component {
    constructor(props) {
        super(props);

        this.handleError = this.handleError.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);

        this.initialState = {
            loading: false
        };

        this.state = this.initialState;
    }

    static propTypes = {
        roomId: PropTypes.string
    };

    handleError() {
        console.error(new Error());
        this.setState(this.initialState);
    }

    async deleteRoom() {
        if(this.state.loading) { return; }

        this.setState({
            loading: true
        });

        var success = await client.operations.deleteRoom(this.props.roomId);
        if(!success) { this.handleError(); }
    }

    render() {
        var hasPermission = client.permission.hasToDeleteRoom(this.props.roomId);

        return (<RoomSettingsDeleteRoomUi hasPermission={hasPermission} loading={this.state.loading} onClick={this.deleteRoom} />);
    }
}

export default RoomSettingsDeleteRoom;
