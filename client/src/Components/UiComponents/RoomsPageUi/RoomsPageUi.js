import React, { Component } from 'react';
import style from './RoomsPageUi.module.css';
import RoomRoutes from '../../WholeComponents/RoomRoutes';
import RoomBar from '../../WholeComponents/RoomBar';

class RoomsPageUi extends Component {
    render() {
        return (
            <div className={style.wrap}>
                <RoomRoutes />
                <RoomBar />
            </div>
        );
    }
}

export default RoomsPageUi;
