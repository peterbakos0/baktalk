import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './DirectMessagingUi.module.css';
import Messaging from '../../WholeComponents/Messaging';

class DirectMessagingUi extends Component {
    static propTypes = {
        directMessagingId: PropTypes.string
    };

    render() {
        return (
            <div className={style.wrap}>
                <Messaging messageParentType='directMessaging' messageParentId={this.props.directMessagingId} />
            </div>
        );
    }
}

export default DirectMessagingUi;
