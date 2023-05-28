import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './FriendBarFriendRequestMenuMenusUi.module.css';
import FriendBarFriendRequestMenuAcceptMenu from '../../WholeComponents/FriendBarFriendRequestMenuAcceptMenu';
import FriendBarFriendRequestMenuDeleteMenu from '../../WholeComponents/FriendBarFriendRequestMenuDeleteMenu';

class FriendBarFriendRequestMenuMenusUi extends Component {
    static propTypes = {
        friendRequestId: PropTypes.string
    };

    render() {
        return (
            <div className={style.wrap}>
                <FriendBarFriendRequestMenuAcceptMenu friendRequestId={this.props.friendRequestId} />
                <FriendBarFriendRequestMenuDeleteMenu friendRequestId={this.props.friendRequestId} />
            </div>
        );
    }
}

export default FriendBarFriendRequestMenuMenusUi;
