import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import FriendBarFriendMenuUi from '../UiComponents/FriendBarFriendMenuUi/FriendBarFriendMenuUi';

class FriendBarFriendMenu extends Component {
    static propTypes = {
        friendId: PropTypes.string
    };

    render() {
        var friend = client.db.friends.findById(this.props.friendId);

        var userId = friend.userIds[Number(!(friend.userIds.indexOf(client.auth.credentials.userId)))];
        var user = client.db.users.findById(userId);

        var userIsOnline = client.utils.isUserOnline(user._id);

        return (<FriendBarFriendMenuUi friendId={friend._id} userId={user._id} username={user.username} userIsOnline={userIsOnline} />);
    }
}

export default FriendBarFriendMenu;
