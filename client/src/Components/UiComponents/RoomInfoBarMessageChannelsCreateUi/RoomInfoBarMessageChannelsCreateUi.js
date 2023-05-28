import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomInfoBarMessageChannelsCreateUi.module.css';
import SideBarCreate from '../../WholeComponents/SideBarCreate';

class RoomInfoBarMessageChannelsCreateUi extends Component {
    static propTypes = {
        channelName: PropTypes.string,
        hasPermission: PropTypes.bool,
        onChannelNameChange: PropTypes.func,
        onSubmit: PropTypes.func
    };

    render() {
        var hasPermission = this.props.hasPermission;
        if(!hasPermission) { return null; }

        return (
            <div className={style.wrap}>
                <SideBarCreate
                    value={this.props.channelName}
                    placeholder='Channel Name'
                    onChange={this.props.onChannelNameChange}
                    onSubmit={this.props.onSubmit}
                />
            </div>
        );
    }
};

export default RoomInfoBarMessageChannelsCreateUi;
