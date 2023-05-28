import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import style from './DirectMessagingRoutesUi.module.css';
import getHomePath from '../../../utils/path/get-home-path';
import getDirectMessagingPath from '../../../utils/path/get-direct-messaging-path';
import DirectMessaging from '../../WholeComponents/DirectMessaging';
import Blank from '../../WholeComponents/Blank';

class DirectMessagingRoutesUi extends Component {
    static propTypes = {
        directMessagingIds: (PropTypes.arrayOf(PropTypes.string))
    };

    render() {
        var directMessagingIds = this.props.directMessagingIds;

        var homePath = getHomePath();
        var firstDirectMessagingPath = getDirectMessagingPath(directMessagingIds[0]);

        var routeComponents = [];
        for(var i = 0; i < directMessagingIds.length; i++) {
            var directMessagingId = directMessagingIds[i];

            var directMessagingPath = getDirectMessagingPath(directMessagingId);

            routeComponents.push(
                <Route path={directMessagingPath} key={directMessagingId}>
                    <DirectMessaging directMessagingId={directMessagingId} />
                </Route>
            );
        }

        return (
            <div className={style.wrap}>
                <Switch>
                    {routeComponents}
                    <Route
                        path={homePath}
                        exact={true}
                        component={(() => (Boolean(directMessagingIds.length) ? <Redirect to={firstDirectMessagingPath} /> : <Blank />))}
                    />
                    <Route component={(() => (<Redirect to={homePath} />))} />
                </Switch>
            </div>
        );
    }
}

export default DirectMessagingRoutesUi;
