import React, { Component } from 'react';
import client from '../../client';
import FriendBarFriendMenusUi from '../UiComponents//FriendBarFriendMenusUi/FriendBarFriendMenusUi';

class FriendBarFriendMenus extends Component {
    render() {
        var friends = client.db.friends.find({});

        var friendIds = [];
        for(var i = 0; i < friends.length; i++) { friendIds.push(friends[i]._id); }

        return (<FriendBarFriendMenusUi friendIds={friendIds} />);
    }
}

export default FriendBarFriendMenus;
