import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import RoomInfoBarMembersMemberMenuUi from '../UiComponents/RoomInfoBarMembersMemberMenuUi/RoomInfoBarMembersMemberMenuUi';

class RoomInfoBarMembersMemberMenu extends Component {
    static propTypes = {
        memberId: PropTypes.string
    };

    render() {
        var member = client.db.members.findById(this.props.memberId);

        var memberName = client.utils.getMemberName(member._id);
        var userIsOnline = client.utils.isUserOnline(member.userId);

        return (
            <RoomInfoBarMembersMemberMenuUi
                memberId={member._id}
                memberName={memberName}
                userId={member.userId}
                roomId={member.roomId}
                userIsOnline={userIsOnline}
            />
        );
    }
}

export default RoomInfoBarMembersMemberMenu;
