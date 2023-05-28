import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './FriendBarFriendMenusUi.module.css';
import getFriendPath from '../../../utils/path/get-friend-path';
import FriendBarFriendMenu from '../../WholeComponents/FriendBarFriendMenu';

class FriendBarFriendMenusUi extends Component {
    static propTypes = {
        friendIds: (PropTypes.arrayOf(PropTypes.string))
    };

    render() {
        var friendIds = this.props.friendIds;

        var menuComponents = [];
        for(var i = 0; i < friendIds.length; i++) {
            var friendId = friendIds[i];

            var friendPath = getFriendPath(friendId);

            menuComponents.push(
                <Link className={style.menuLink} to={friendPath} key={friendId}>
                    <FriendBarFriendMenu friendId={friendId} />
                </Link>
            );
        }

        return (<div className={style.wrap}>{menuComponents}</div>);
    }
}

export default FriendBarFriendMenusUi;
