import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import RoomSettingsLeaveRoomUi from '../UiComponents/RoomSettingsLeaveRoomUi/RoomSettingsLeaveRoomUi';

class RoomSettingsLeaveRoom extends Component {
    constructor(props) {
        super(props);

        this.handleError = this.handleError.bind(this);
        this.leaveRoom = this.leaveRoom.bind(this);

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

    async leaveRoom() {
        if(this.state.loading) { return; }

        this.setState({
            loading: true
        });

        var member = client.db.members.findOne({
            userId: client.auth.credentials.userId,
            roomId: this.props.roomId
        });

        var success = await client.operations.deleteMember(member._id);
        if(!success) { this.handleError(); }
    }

    render() {
        return (<RoomSettingsLeaveRoomUi loading={this.state.loading} onClick={this.leaveRoom} />);
    }
}

export default RoomSettingsLeaveRoom;
