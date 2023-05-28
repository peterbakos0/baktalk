import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoomInfoBarUi from '../UiComponents/RoomInfoBarUi/RoomInfoBarUi';

class RoomInfoBar extends Component {
    static propTypes = {
        roomId: PropTypes.string
    };

    render() {
        return (<RoomInfoBarUi roomId={this.props.roomId} />);
    }
}

export default RoomInfoBarUi;
