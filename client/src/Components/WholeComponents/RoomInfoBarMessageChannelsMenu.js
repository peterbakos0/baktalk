import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import RoomInfoBarMessageChannelsMenuUi from '../UiComponents/RoomInfoBarMessageChannelsMenuUi/RoomInfoBarMessageChannelsMenuUi';

class RoomInfoBarMessageChannelsMenu extends Component {
    static propTypes = {
        channelId: PropTypes.string
    };

    render() {
        var channel = client.db.channels.findById(this.props.channelId);

        return (<RoomInfoBarMessageChannelsMenuUi channelId={channel._id} channelName={channel.name} roomId={channel.roomId} />);
    }
}

export default RoomInfoBarMessageChannelsMenu;
