import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import RoomInfoBarMembersListUi from '../UiComponents//RoomInfoBarMembersListUi/RoomInfoBarMembersListUi';

class RoomInfoBarMembersList extends Component {
    static propTypes = {
        roomId: PropTypes.string
    };

    render() {
        return (<RoomInfoBarMembersListUi roomId={this.props.roomId} />);
    }
}

export default RoomInfoBarMembersList;
