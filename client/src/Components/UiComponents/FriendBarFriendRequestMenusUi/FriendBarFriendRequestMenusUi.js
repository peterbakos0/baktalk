import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './FriendBarFriendRequestMenusUi.module.css';
import FriendBarFriendRequestMenu from '../../WholeComponents/FriendBarFriendRequestMenu';

class FriendBarFriendRequestMenusUi extends Component {
    static propTypes = {
        friendRequestIds: (PropTypes.arrayOf(PropTypes.string))
    };

    render() {
        var friendRequestIds = this.props.friendRequestIds;

        var menuComponents = [];
        for(var i = 0; i < friendRequestIds.length; i++) {
            var friendRequestId = friendRequestIds[i];
            menuComponents.push(<FriendBarFriendRequestMenu friendRequestId={friendRequestId} key={friendRequestId} />);
        }

        return (<div className={style.wrap}>{menuComponents}</div>);
    }
}

export default FriendBarFriendRequestMenusUi;
