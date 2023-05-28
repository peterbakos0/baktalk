import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import RoomInfoBarMessageChannelsMenuSettingsMenuUi from '../UiComponents/RoomInfoBarMessageChannelsMenuSettingsMenuUi/RoomInfoBarMessageChannelsMenuSettingsMenuUi';

class RoomInfoBarMessageChannelsMenuSettingsMenu extends Component {
    static propTypes = {
        channelId: PropTypes.string
    };

    render() {
        var channel = client.db.channels.findById(this.props.channelId);

        return (<RoomInfoBarMessageChannelsMenuSettingsMenuUi channelId={channel._id} roomId={channel.roomId} />);
    }
}

export default RoomInfoBarMessageChannelsMenuSettingsMenu;
