import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomInfoBarUi.module.css';
import RoomInfoBarMessageChannels from '../../WholeComponents/RoomInfoBarMessageChannels';
import RoomInfoBarMembers from '../../WholeComponents/RoomInfoBarMembers';

class RoomInfoBarUi extends Component {
    static propTypes = {
        roomId: PropTypes.string
    };

    render() {
        return (
            <div className={style.wrap}>
                <RoomInfoBarMessageChannels roomId={this.props.roomId} />
                <RoomInfoBarMembers roomId={this.props.roomId} />
            </div>
        );
    }
}

export default RoomInfoBarUi;
