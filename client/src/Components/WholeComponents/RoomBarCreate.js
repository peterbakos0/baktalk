import React, { Component } from 'react';
import client from '../../client';
import RoomBarCreateUi from '../UiComponents/RoomBarCreateUi/RoomBarCreateUi';

class RoomBarCreate extends Component {
    constructor() {
        super();

        this.handleError = this.handleError.bind(this);
        this.updateRoomName = this.updateRoomName.bind(this);
        this.submit = this.submit.bind(this);

        this.initialState = {
            roomName: ''
        };

        this.state = this.initialState;
    }

    handleError() {
        console.error(new Error());
    }

    updateRoomName(value) {
        this.setState({
            roomName: value
        });
    }

    async submit() {
        var roomName = this.state.roomName;

        this.setState(this.initialState);

        var success = await client.operations.createRoom(roomName);
        if(!success) { this.handleError(); }
    }

    render() {
        return (<RoomBarCreateUi roomName={this.state.roomName} onRoomNameChange={this.updateRoomName} onSubmit={this.submit} />);
    }
}

export default RoomBarCreate;
