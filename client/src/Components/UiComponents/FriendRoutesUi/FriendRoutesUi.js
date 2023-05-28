import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import style from './FriendRoutesUi.module.css';
import getFriendsPath from '../../../utils/path/get-friends-path';
import getFriendPath from '../../../utils/path/get-friend-path';
import Friend from '../../WholeComponents/Friend';
import Blank from '../../WholeComponents/Blank';

class FriendRoutesUi extends Component {
    static propTypes = {
        friendIds: (PropTypes.arrayOf(PropTypes.string))
    };

    render() {
        var friendIds = this.props.friendIds;

        var friendsPath = getFriendsPath();
        var firstFriendPath = getFriendPath(friendIds[0]);

        var routeComponents = [];
        for(var i = 0; i < friendIds.length; i++) {
            var friendId = friendIds[i];

            var friendPath = getFriendPath(friendId);

            routeComponents.push(
                <Route path={friendPath} key={friendId}>
                    <Friend friendId={friendId} />
                </Route>
            );
        }

        return (
            <div className={style.wrap}>
                <Switch>
                    {routeComponents}
                    <Route
                        path={friendsPath}
                        exact={true}
                        component={(() => (Boolean(friendIds.length) ? <Redirect to={firstFriendPath} /> : <Blank />))}
                    />
                    <Route component={(() => (<Redirect to={friendsPath} />))} />
                </Switch>
            </div>
        );
    }
}

export default FriendRoutesUi;
