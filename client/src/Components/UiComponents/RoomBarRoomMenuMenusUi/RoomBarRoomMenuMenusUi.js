import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomBarRoomMenuMenusUi.module.css';
import RoomBarRoomMenuSettingsMenu from '../../WholeComponents/RoomBarRoomMenuSettingsMenu';

class RoomBarRoomMenuMenusUi extends Component {
    static propTypes = {
        className: PropTypes.string,
        roomId: PropTypes.string
    };

    render() {
        return (
            <div className={(style.wrap + ' ' + this.props.className)}>
                <RoomBarRoomMenuSettingsMenu roomId={this.props.roomId} />
            </div>
        );
    }
}

export default RoomBarRoomMenuMenusUi;
