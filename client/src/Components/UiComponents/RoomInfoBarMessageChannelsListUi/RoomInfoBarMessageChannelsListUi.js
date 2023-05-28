import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './RoomInfoBarMessageChannelsListUi.module.css';
import getChannelPath from '../../../utils/path/get-channel-path';
import RoomInfoBarMessageChannelsMenu from '../../WholeComponents/RoomInfoBarMessageChannelsMenu';

class RoomInfoBarMessageChannelsListUi extends Component {
    static propTypes = {
        roomId: PropTypes.string,
        channelIds: (PropTypes.arrayOf(PropTypes.string))
    };

    render() {
        var channelIds = this.props.channelIds;

        var menuComponents = [];
        for(var i = 0; i < channelIds.length; i++) {
            var channelId = channelIds[i];

            var channelPath = getChannelPath(channelId, this.props.roomId);

            menuComponents.push(
                <Link className={style.menuLink} to={channelPath} key={channelId}>
                    <RoomInfoBarMessageChannelsMenu channelId={channelId} />
                </Link>
            );
        }

        return (<div className={style.wrap}>{menuComponents}</div>);
    }
}

export default RoomInfoBarMessageChannelsListUi;
