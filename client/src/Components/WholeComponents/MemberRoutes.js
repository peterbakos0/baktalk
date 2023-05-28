import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import MemberRoutesUi from '../UiComponents/MemberRoutesUi/MemberRoutesUi';

class MemberRoutes extends Component {
    static propTypes = {
        roomId: PropTypes.string
    };

    render() {
        var members = client.db.members.find({
            roomId: this.props.roomId
        });

        var memberIds = [];
        for(var i = 0; i < members.length; i++) { memberIds.push(members[i]._id); }

        return (<MemberRoutesUi roomId={this.props.roomId} memberIds={memberIds} />);
    }
}

export default MemberRoutes;
