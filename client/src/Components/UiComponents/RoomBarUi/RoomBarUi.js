import React, { Component } from 'react';
import style from './RoomBarUi.module.css';
import RoomBarCreate from '../../WholeComponents/RoomBarCreate';
import RoomBarList from '../../WholeComponents/RoomBarList';

class RoomBarUi extends Component {
    render() {
        return (
            <div className={style.wrap}>
                <RoomBarCreate />
                <RoomBarList />
            </div>
        );
    }
}

export default RoomBarUi;
