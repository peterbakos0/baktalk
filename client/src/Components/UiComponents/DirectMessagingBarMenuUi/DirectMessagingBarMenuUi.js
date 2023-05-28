import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './DirectMessagingBarMenuUi.module.css';
import getDirectMessagingPath from '../../../utils/path/get-direct-messaging-path';
import SideBarMenu from '../../WholeComponents/SideBarMenu';
import Avatar from '../../WholeComponents/Avatar';

class DirectMessagingBarMenuUi extends Component {
    static propTypes = {
        directMessagingId: PropTypes.string,
        userId: PropTypes.string,
        username: PropTypes.string,
        userIsOnline: PropTypes.bool
    };

    render() {
        var directMessagingPath = getDirectMessagingPath(this.props.directMessagingId);
        var selected = window.location.pathname.startsWith(directMessagingPath);

        return (
            <div className={style.wrap}>
                <SideBarMenu text={this.props.username} online={this.props.userIsOnline} selected={selected}>
                    <Avatar userId={this.props.userId} sizePx={32} />
                    {null}
                </SideBarMenu>
            </div>
        );
    }
}

export default DirectMessagingBarMenuUi;
