import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomBarCreateUi.module.css';
import SideBarCreate from '../../WholeComponents/SideBarCreate';

class RoomBarCreateUi extends Component {
    static propTypes = {
        roomName: PropTypes.string,
        onRoomNameChange: PropTypes.func,
        onSubmit: PropTypes.func
    };

    render() {
        return (
            <div className={style.wrap}>
                <SideBarCreate value={this.props.roomName} placeholder='Room Name' onChange={this.props.onRoomNameChange} onSubmit={this.props.onSubmit} />
            </div>
        );
    }
}

export default RoomBarCreateUi;
