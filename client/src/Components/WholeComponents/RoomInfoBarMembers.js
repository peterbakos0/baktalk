import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoomInfoBarMembersUi from '../UiComponents/RoomInfoBarMembersUi/RoomInfoBarMembersUi';

class RoomInfoBarMembers extends Component {
    static propTypes = {
        roomId: PropTypes.string
    };

    render() {
        return (<RoomInfoBarMembersUi roomId={this.props.roomId} />);
    }
}

export default RoomInfoBarMembers;
