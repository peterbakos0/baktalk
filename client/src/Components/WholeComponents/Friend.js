import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FriendUi from '../UiComponents/FriendUi/FriendUi';

class Friend extends Component {
    static propTypes = {
        friendId: PropTypes.string
    };

    render() {
        return (<FriendUi friendId={this.props.friendId} />);
    }
}

export default Friend;
