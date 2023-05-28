import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import style from './MessageChannelRoutesUi.module.css';
import getRoomPath from '../../../utils/path/get-room-path';
import getChannelPath from '../../../utils/path/get-channel-path';
import getChannelsPath from '../../../utils/path/get-channels-path';
import getChannelSettingsPath from '../../../utils/path/get-channel-settings-path';
import MessageChannel from '../../WholeComponents/MessageChannel';
import MessageChannelSettings from '../../WholeComponents/MessageChannelSettings';
import Blank from '../../WholeComponents/Blank';

class MessageChannelRoutesUi extends Component {
    static propTypes = {
        roomId: PropTypes.string,
        channelIds: (PropTypes.arrayOf(PropTypes.string))
    };

    render() {
        var channelIds = this.props.channelIds;

        var roomPath = getRoomPath(this.props.roomId);
        var firstChannelPath = getChannelPath(channelIds[0], this.props.roomId);
        var channelsPath = getChannelsPath(this.props.roomId);

        var routeComponents = [];
        for(var i = 0; i < channelIds.length; i++) {
            var channelId = channelIds[i];

            var channelPath = getChannelPath(channelId, this.props.roomId);
            var channelSettingsPath = getChannelSettingsPath(channelId, this.props.roomId);

            routeComponents.push(
                <Route path={channelSettingsPath} key={(channelId + '_settings')}>
                    <MessageChannelSettings channelId={channelId} />
                </Route>
            );

            routeComponents.push(
                <Route path={channelPath} key={channelId}>
                    <MessageChannel channelId={channelId} />
                </Route>
            );
        }

        return (
            <div className={style.wrap}>
                <Switch>
                    {routeComponents}
                    <Route
                        path={roomPath}
                        exact={true}
                        component={(() => (Boolean(channelIds.length) ? <Redirect to={firstChannelPath} /> : <Blank />))}
                    />
                    <Route path={channelsPath} component={(() => (<Redirect to={roomPath} />))} />
                </Switch>
            </div>
        );
    }
}

export default MessageChannelRoutesUi;
