import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './FriendBarListUi.module.css';
import FriendBarFriendRequestMenus from '../../WholeComponents/FriendBarFriendRequestMenus';
import FriendBarFriendMenus from '../../WholeComponents/FriendBarFriendMenus';
import Blank from '../../WholeComponents/Blank';

class FriendBarListUi extends Component {
    static propTypes = {
        anyFriendRequestsOrFriends: PropTypes.bool
    };

    render() {
        return (
            <div className={style.wrap}>
                <FriendBarFriendRequestMenus />
                <FriendBarFriendMenus />
                {(this.props.anyFriendRequestsOrFriends ? null : <Blank />)}
            </div>
        );
    }
}

export default FriendBarListUi;
