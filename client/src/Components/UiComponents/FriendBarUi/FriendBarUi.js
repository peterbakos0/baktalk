import React, { Component } from 'react';
import style from './FriendBarUi.module.css';
import FriendBarAdd from '../../WholeComponents/FriendBarAdd';
import FriendBarList from '../../WholeComponents/FriendBarList';

class FriendBarUi extends Component {
    render() {
        return (
            <div className={style.wrap}>
                <FriendBarAdd />
                <FriendBarList />
            </div>
        );
    }
}

export default FriendBarUi;
