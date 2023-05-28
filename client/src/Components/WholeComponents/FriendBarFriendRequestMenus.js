import React, { Component } from 'react';
import client from '../../client';
import FriendBarFriendRequestMenusUi from '../UiComponents/FriendBarFriendRequestMenusUi/FriendBarFriendRequestMenusUi';

class FriendBarFriendRequestMenus extends Component {
    render() {
        var friendRequests = client.db.friendRequests.find({});

        var friendRequestIds = [];
        for(var i = 0; i < friendRequests.length; i++) { friendRequestIds.push(friendRequests[i]._id); }

        return (<FriendBarFriendRequestMenusUi friendRequestIds={friendRequestIds} />);
    }
}

export default FriendBarFriendRequestMenus;
