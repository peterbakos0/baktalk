import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FriendBarFriendRequestMenuMenusUi from '../UiComponents/FriendBarFriendRequestMenuMenusUi/FriendBarFriendRequestMenuMenusUi';

class FriendBarFriendRequestMenuMenus extends Component {
    static propTypes = {
        friendRequestId: PropTypes.string
    };

    render() {
        return (<FriendBarFriendRequestMenuMenusUi friendRequestId={this.props.friendRequestId} />);
    }
}

export default FriendBarFriendRequestMenuMenus;
