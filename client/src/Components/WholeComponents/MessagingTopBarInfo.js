import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import MessagingTopBarInfoUi from '../UiComponents/MessagingTopBarInfoUi/MessagingTopBarInfoUi';

class MessagingTopBarInfo extends Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.uninit = this.uninit.bind(this);
        this.rerender = this.rerender.bind(this);
    }

    static propTypes = {
        messageParentType: PropTypes.string,
        messageParentId: PropTypes.string
    };

    init() {
        client.on('change', this.rerender);
    }

    uninit() {
        client.off('change', this.rerender);
    }

    rerender() {
        this.forceUpdate();
    }

    componentWillUnmount() {
        this.uninit();
    }

    componentDidMount() {
        this.init();
    }

    render() {
        var username;
        var userIsOnline;
        var channelName;

        if(this.props.messageParentType === 'directMessaging') {
            var directMessaging = client.db.directMessagings.findById(this.props.messageParentId);

            var userId = directMessaging.userIds[Number(!(directMessaging.userIds.indexOf(client.auth.credentials.userId)))];
            var user = client.db.users.findById(userId);

            username = user.username;
            userIsOnline = client.utils.isUserOnline(user._id);
        }
        else if(this.props.messageParentType === 'channel') {
            var channel = (client.db.channels.findById(this.props.messageParentId) || {});
            channelName = channel.name;
        }

        return (
            <MessagingTopBarInfoUi
                messageParentType={this.props.messageParentType}
                username={username}
                userIsOnline={userIsOnline}
                channelName={channelName}
            />
        );
    }
}

export default MessagingTopBarInfo;
