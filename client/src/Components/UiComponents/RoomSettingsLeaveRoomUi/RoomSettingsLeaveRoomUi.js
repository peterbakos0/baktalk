import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomSettingsLeaveRoomUi.module.css';
import FormButton from '../../WholeComponents/FormButton';

class RoomSettingsLeaveRoomUi extends Component {
    static propTypes = {
        loading: PropTypes.bool,
        onClick: PropTypes.func
    };

    render() {
        return (
            <div className={style.wrap}>
                <FormButton type='button' text='Leave Room' color='#AA0000' solid={false} loading={this.props.loading} onClick={this.props.onClick} />
            </div>
        );
    }
}

export default RoomSettingsLeaveRoomUi;
