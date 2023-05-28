import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './FriendBarFriendMenuUi.module.css';
import getFriendPath from '../../../utils/path/get-friend-path';
import SideBarMenu from '../../WholeComponents/SideBarMenu';
import Avatar from '../../WholeComponents/Avatar';

class FriendBarFriendMenuUi extends Component {
    static propTypes = {
        friendId: PropTypes.string,
        userId: PropTypes.string,
        username: PropTypes.string,
        userIsOnline: PropTypes.bool
    };

    render() {
        var friendPath = getFriendPath(this.props.friendId);
        var selected = window.location.pathname.startsWith(friendPath);

        return (
            <div className={style.wrap}>
                <SideBarMenu text={this.props.username} online={this.props.userIsOnline} selected={selected}>
                    <Avatar userId={this.props.userId} sizePx={32} />
                    {null}
                </SideBarMenu>
            </div>
        );
    }
}

export default FriendBarFriendMenuUi;
