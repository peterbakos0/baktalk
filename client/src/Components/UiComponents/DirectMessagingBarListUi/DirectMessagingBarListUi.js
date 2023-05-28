import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './DirectMessagingBarListUi.module.css';
import getDirectMessagingPath from '../../../utils/path/get-direct-messaging-path';
import DirectMessagingBarMenu from '../../WholeComponents/DirectMessagingBarMenu';
import Blank from '../../WholeComponents/Blank';

class DirectMessagingBarListUi extends Component {
    static defaultProps = {
        directMessagingIds: (PropTypes.arrayOf(PropTypes.string))
    };

    render() {
        var directMessagingIds = this.props.directMessagingIds;

        var menuComponents = [];
        for(var i = 0; i < directMessagingIds.length; i++) {
            var directMessagingId = directMessagingIds[i];

            var directMessagingPath = getDirectMessagingPath(directMessagingId);

            menuComponents.push(
                <Link className={style.menuLink} to={directMessagingPath} key={directMessagingId}>
                    <DirectMessagingBarMenu directMessagingId={directMessagingId} />
                </Link>
            );
        }

        return (<div className={style.wrap}>{(Boolean(menuComponents.length) ? menuComponents : <Blank />)}</div>);
    }
}

export default DirectMessagingBarListUi;
