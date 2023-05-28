import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import style from './RoomBarRoomMenuSettingsMenuUi.module.css';
import getRoomSettingsPath from '../../../utils/path/get-room-settings-path';
import cogSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/cog-solid-light-icon.png';

class RoomBarRoomMenuSettingsMenuUi extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    static propTypes = {
        roomId: PropTypes.string,
        history: PropTypes.object
    };

    onClick(event) {
        event.preventDefault();

        var roomSettingsPath = getRoomSettingsPath(this.props.roomId);
        this.props.history.push(roomSettingsPath);
    }

    render() {
        return (
            <div className={style.wrap} onClick={this.onClick}>
                <img className={style.icon} src={cogSolidLightIcon} />
            </div>
        );
    }
}

RoomBarRoomMenuSettingsMenuUi = withRouter(RoomBarRoomMenuSettingsMenuUi);

export default RoomBarRoomMenuSettingsMenuUi;
