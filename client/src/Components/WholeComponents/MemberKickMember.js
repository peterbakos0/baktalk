import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import MemberKickMemberUi from '../UiComponents/MemberKickMemberUi/MemberKickMemberUi';

class MemberKickMember extends Component {
    constructor(props) {
        super(props);

        this.handleError = this.handleError.bind(this);
        this.kickMember = this.kickMember.bind(this);

        this.initialState = {
            loading: false
        };

        this.state = this.initialState;
    }

    static propTypes = {
        memberId: PropTypes.string
    };

    handleError() {
        console.error(new Error());
        this.setState(this.initialState);
    }

    async kickMember() {
        if(this.state.loading) { return; }

        this.setState({
            loading: true
        });

        var success = await client.operations.deleteMember(this.props.memberId);
        if(!success) { this.handleError(); }
    }

    render() {
        var hasPermission = client.permission.hasToKickMember(this.props.memberId);

        return (<MemberKickMemberUi hasPermission={hasPermission} loading={this.state.loading} onClick={this.kickMember} />);
    }
}

export default MemberKickMember;
