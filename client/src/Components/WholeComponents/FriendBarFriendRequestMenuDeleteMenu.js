import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import FriendBarFriendRequestMenuDeleteMenuUi from '../UiComponents/FriendBarFriendRequestMenuDeleteMenuUi/FriendBarFriendRequestMenuDeleteMenuUi';

class FriendBarFriendRequestMenuDeleteMenu extends Component {
    constructor(props) {
        super(props);

        this.handleError = this.handleError.bind(this);
        this.deleteFriendRequest = this.deleteFriendRequest.bind(this);
    }

    static propTypes = {
        friendRequestId: PropTypes.string
    };

    handleError() {
        console.error(new Error());
    }

    async deleteFriendRequest() {
        var success = await client.operations.deleteFriendRequest(this.props.friendRequestId);
        if(!success) { this.handleError(); }
    }

    render() {
        return (<FriendBarFriendRequestMenuDeleteMenuUi onClick={this.deleteFriendRequest} />);
    }
}

export default FriendBarFriendRequestMenuDeleteMenu;
