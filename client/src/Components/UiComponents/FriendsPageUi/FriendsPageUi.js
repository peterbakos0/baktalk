import React, { Component } from 'react';
import style from './FriendsPageUi.module.css';
import FriendRoutes from '../../WholeComponents/FriendRoutes';
import FriendBar from '../../WholeComponents/FriendBar';

class FriendsPageUi extends Component {
    render() {
        return (
            <div className={style.wrap}>
                <FriendRoutes />
                <FriendBar />
            </div>
        );
    }
}

export default FriendsPageUi;
