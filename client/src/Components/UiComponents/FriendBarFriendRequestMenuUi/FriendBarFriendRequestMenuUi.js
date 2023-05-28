import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './FriendBarFriendRequestMenuUi.module.css';
import SideBarMenu from '../../WholeComponents/SideBarMenu';
import Avatar from '../../WholeComponents/Avatar';
import FriendBarFriendRequestMenuMenus from '../../WholeComponents/FriendBarFriendRequestMenuMenus';

class FriendBarFriendRequestMenuUi extends Component {
    static propTypes = {
        friendRequestId: PropTypes.string,
        userId: PropTypes.string,
        username: PropTypes.string,
        userIsOnline: PropTypes.bool
    };

    render() {
        return (
            <div className={style.wrap}>
                <SideBarMenu text={this.props.username} online={this.props.userIsOnline}>
                    <Avatar userId={this.props.userId} sizePx={32} />
                    <FriendBarFriendRequestMenuMenus friendRequestId={this.props.friendRequestId} />
                </SideBarMenu>
            </div>
        );
    }
}

export default FriendBarFriendRequestMenuUi;
