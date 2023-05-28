import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoomSettingsUi from '../UiComponents/RoomSettingsUi/RoomSettingsUi';

class RoomSettings extends Component {
    static propTypes = {
        roomId: PropTypes.string
    };

    render() {
        return (<RoomSettingsUi roomId={this.props.roomId} />)
    }
}

export default RoomSettings;
