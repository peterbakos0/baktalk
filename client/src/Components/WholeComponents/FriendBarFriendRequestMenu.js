import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import FriendBarFriendRequestMenuUi from '../UiComponents/FriendBarFriendRequestMenuUi/FriendBarFriendRequestMenuUi';

class FriendBarFriendRequestMenu extends Component {
    static propTypes = {
        friendRequestId: PropTypes.string
    };

    render() {
        var friendRequest = client.db.friendRequests.findById(this.props.friendRequestId);

        var userIds = [friendRequest.senderUserId, friendRequest.receiverUserId];
        var userId = userIds[Number(!(userIds.indexOf(client.auth.credentials.userId)))];

        var user = client.db.users.findById(userId);

        var userIsOnline = client.utils.isUserOnline(user._id);

        return (
            <FriendBarFriendRequestMenuUi
                friendRequestId={friendRequest._id}
                userId={user._id}
                username={user.username}
                userIsOnline={userIsOnline}
            />
        );
    }
}

export default FriendBarFriendRequestMenu;
