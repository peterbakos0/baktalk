import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomUi.module.css';
import MessageChannelRoutes from '../../WholeComponents/MessageChannelRoutes';
import MemberRoutes from '../../WholeComponents/MemberRoutes';
import RoomInfoBar from '../../WholeComponents/RoomInfoBar';

class RoomUi extends Component {
    static propTypes = {
        roomId: PropTypes.string
    };

    render() {
        return (
            <div className={style.wrap}>
                <MessageChannelRoutes roomId={this.props.roomId} />
                <MemberRoutes roomId={this.props.roomId} />
                <RoomInfoBar roomId={this.props.roomId} />
            </div>
        );
    }
}

export default RoomUi;
