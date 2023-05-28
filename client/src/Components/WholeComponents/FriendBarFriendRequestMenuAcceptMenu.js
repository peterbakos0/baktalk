import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import FriendBarFriendRequestMenuAcceptMenuUi from '../UiComponents/FriendBarFriendRequestMenuAcceptMenuUi/FriendBarFriendRequestMenuAcceptMenuUi';

class FriendBarFriendRequestMenuAcceptMenu extends Component {
    constructor(props) {
        super(props);

        this.handleError = this.handleError.bind(this);
        this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
    }

    static propTypes = {
        friendRequestId: PropTypes.string
    };

    handleError() {
        console.error(new Error());
    }

    async acceptFriendRequest() {
        var success = await client.operations.acceptFriendRequest(this.props.friendRequestId);
        if(!success) { this.handleError(); }
    }

    render() {
        var hasPermission = client.permission.hasToAcceptFriendRequest(this.props.friendRequestId);

        return (<FriendBarFriendRequestMenuAcceptMenuUi hasPermission={hasPermission} onClick={this.acceptFriendRequest} />);
    }
}

export default FriendBarFriendRequestMenuAcceptMenu;
