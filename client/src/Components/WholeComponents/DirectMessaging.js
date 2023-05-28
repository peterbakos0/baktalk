import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DirectMessagingUi from '../UiComponents/DirectMessagingUi/DirectMessagingUi';

class DirectMessaging extends Component {
    static propTypes = {
        directMessagingId: PropTypes.string
    };

    render() {
        return (<DirectMessagingUi directMessagingId={this.props.directMessagingId} />);
    }
}

export default DirectMessaging;
