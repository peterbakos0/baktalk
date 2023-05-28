import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import RoomSettingsFormUi from '../UiComponents/RoomSettingsFormUi/RoomSettingsFormUi';

class RoomSettingsForm extends Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.handleError = this.handleError.bind(this);
        this.updateRoomName = this.updateRoomName.bind(this);
        this.changeIcon = this.changeIcon.bind(this);
        this.load = this.load.bind(this);
        this.submit = this.submit.bind(this);

        this.initialState = {
            roomName: '',
            iconFile: null,
            iconFileUrl: null,
            loading: false
        };

        this.state = this.initialState;
    }

    static propTypes = {
        roomId: PropTypes.string
    };

    init() {
        this.load();
    }

    handleError() {
        console.error(new Error());
        this.load();
    }

    updateRoomName(value) {
        this.setState({
            roomName: value
        });
    }

    changeIcon(iconFile) {
        var iconFileUrl = URL.createObjectURL(iconFile);

        this.setState({
            iconFile: iconFile,
            iconFileUrl: iconFileUrl
        });
    }

    load() {
        var room = client.db.rooms.findById(this.props.roomId);
        if(!room) { return; }

        this.setState(this.initialState);

        this.setState({
            roomName: room.name
        });
    }

    async submit() {
        if(this.state.loading) { return; }

        this.setState({
            loading: true
        });

        var roomName = this.state.roomName;
        var iconFile = this.state.iconFile;

        var success = await client.utils.updateRoom(this.props.roomId, roomName, iconFile);
        if(!success) {
            this.handleError();
            return;
        }

        this.setState({
            loading: false
        });
    }

    componentDidMount() {
        this.init();
    }

    render() {
        var hasPermission = client.permission.hasToUpdateRoom(this.props.roomId);

        return (
            <RoomSettingsFormUi
                roomId={this.props.roomId}
                roomName={this.state.roomName}
                iconFileUrl={this.state.iconFileUrl}
                hasPermission={hasPermission}
                loading={this.state.loading}
                onRoomNameChange={this.updateRoomName}
                onIconChange={this.changeIcon}
                onSubmit={this.submit}
            />
        );
    }
}

export default RoomSettingsForm;
