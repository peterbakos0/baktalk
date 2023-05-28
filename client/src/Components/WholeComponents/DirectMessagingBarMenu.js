import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import DirectMessagingBarMenuUi from '../UiComponents/DirectMessagingBarMenuUi/DirectMessagingBarMenuUi';

class DirectMessagingBarMenu extends Component {
    static propTypes = {
        directMessagingId: PropTypes.string
    };

    render() {
        var directMessaging = client.db.directMessagings.findById(this.props.directMessagingId);

        var userId = directMessaging.userIds[Number(!(directMessaging.userIds.indexOf(client.auth.credentials.userId)))];
        var user = client.db.users.findById(userId);

        var userIsOnline = client.utils.isUserOnline(user._id);

        return (
            <DirectMessagingBarMenuUi
                directMessagingId={directMessaging._id}
                userId={user._id}
                username={user.username}
                userIsOnline={userIsOnline}
            />
        );
    }
}

export default DirectMessagingBarMenu;
