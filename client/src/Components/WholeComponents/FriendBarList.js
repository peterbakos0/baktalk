import React, { Component } from 'react';
import client from '../../client';
import FriendBarListUi from '../UiComponents/FriendBarListUi/FriendBarListUi';

class FriendBarList extends Component {
    constructor() {
        super();

        this.init = this.init.bind(this);
        this.uninit = this.uninit.bind(this);
        this.rerender = this.rerender.bind(this);

        this.mounted = false;
    }

    init() {
        client.on('change', this.rerender);
    }

    uninit() {
        client.off('change', this.rerender);
    }

    rerender() {
        if(this.mounted) { this.forceUpdate(); }
    }

    componentWillUnmount() {
        this.mounted = false;
        this.uninit();
    }

    componentDidMount() {
        this.mounted = true;
        this.init();
    }

    render() {
        var friendRequestCount = client.db.friendRequests.count({});
        var friendCount = client.db.friends.count({});

        var anyFriendRequestsOrFriends = Boolean(friendRequestCount || friendCount);

        return (<FriendBarListUi anyFriendRequestsOrFriends={anyFriendRequestsOrFriends} />);
    }
}

export default FriendBarList;
