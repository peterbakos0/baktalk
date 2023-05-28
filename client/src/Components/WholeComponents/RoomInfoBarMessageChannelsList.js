import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import RoomInfoBarMessageChannelsListUi from '../UiComponents/RoomInfoBarMessageChannelsListUi/RoomInfoBarMessageChannelsListUi';

class RoomInfoBarMessageChannelsList extends Component {
    static propTypes = {
        roomId: PropTypes.string
    };

    render() {
        var channels = client.db.channels.find({
            roomId: this.props.roomId
        });

        var channelIds = [];
        for(var i = 0; i < channels.length; i++) { channelIds.push(channels[i]._id); }

        return (<RoomInfoBarMessageChannelsListUi roomId={this.props.roomId} channelIds={channelIds} />);
    }
}

export default RoomInfoBarMessageChannelsList;
