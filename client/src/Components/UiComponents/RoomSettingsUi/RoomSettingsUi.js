import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomSettingsUi.module.css';
import RoomSettingsForm from '../../WholeComponents/RoomSettingsForm';

class RoomSettingsUi extends Component {
    static propTypes = {
        roomId: PropTypes.string
    };

    render() {
        return (
            <div className={style.wrap}>
                <RoomSettingsForm roomId={this.props.roomId} />
            </div>
        );
    }
}

export default RoomSettingsUi;
