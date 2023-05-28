import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoomSettingsIconUi from '../UiComponents/RoomSettingsIconUi/RoomSettingsIconUi';

class RoomSettingsIcon extends Component {
    static propTypes = {
        roomId: PropTypes.string,
        fileUrl: PropTypes.string,
        hasPermission: PropTypes.bool,
        onChange: PropTypes.func
    };

    render() {
        return (
            <RoomSettingsIconUi
                roomId={this.props.roomId}
                fileUrl={this.props.fileUrl}
                hasPermission={this.props.hasPermission}
                onChange={this.props.onChange}
            />
        );
    }
}

export default RoomSettingsIcon;
