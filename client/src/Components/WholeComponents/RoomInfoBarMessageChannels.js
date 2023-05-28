import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoomInfoBarMessageChannelsUi from '../UiComponents/RoomInfoBarMessageChannelsUi/RoomInfoBarMessageChannelsUi';

class RoomInfoBarMessageChannels extends Component {
    static propTypes = {
        roomId: PropTypes.string
    };

    render() {
        return (<RoomInfoBarMessageChannelsUi roomId={this.props.roomId} />);
    }
}

export default RoomInfoBarMessageChannels;
