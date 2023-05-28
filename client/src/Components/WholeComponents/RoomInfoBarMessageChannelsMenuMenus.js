import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoomInfoBarMessageChannelsMenuMenusUi from '../UiComponents/RoomInfoBarMessageChannelsMenuMenusUi/RoomInfoBarMessageChannelsMenuMenusUi';

class RoomInfoBarMessageChannelsMenuMenus extends Component {
    static propTypes = {
        className: PropTypes.string,
        channelId: PropTypes.string
    };

    render() {
        return (<RoomInfoBarMessageChannelsMenuMenusUi className={this.props.className} channelId={this.props.channelId} />);
    }
}

export default RoomInfoBarMessageChannelsMenuMenus;
