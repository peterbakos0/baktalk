import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import MessageChannelRoutesUi from '../UiComponents/MessageChannelRoutesUi/MessageChannelRoutesUi';

class MessageChannelRoutes extends Component {
    static propTypes = {
        roomId: PropTypes.string
    };

    render() {
        var channels = client.db.channels.find({
            roomId: this.props.roomId
        });

        var channelIds = [];
        for(var i = 0; i < channels.length; i++) { channelIds.push(channels[i]._id); }

        return (<MessageChannelRoutesUi roomId={this.props.roomId} channelIds={channelIds} />);
    }
}

export default MessageChannelRoutes;
