import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import MemberFormUi from '../UiComponents/MemberFormUi/MemberFormUi';

class MemberForm extends Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.handleError = this.handleError.bind(this);
        this.updateMemberName = this.updateMemberName.bind(this);
        this.updateMemberIsAdmin = this.updateMemberIsAdmin.bind(this);
        this.load = this.load.bind(this);
        this.submit = this.submit.bind(this);

        this.initialState = {
            memberName: '',
            memberIsAdmin: false,
            loading: false
        };

        this.state = this.initialState;
    }

    static propTypes = {
        memberId: PropTypes.string
    };

    init() {
        this.load();
    }

    handleError() {
        console.error(new Error());
        this.load();
    }

    updateMemberName(value) {
        this.setState({
            memberName: value
        });
    }

    updateMemberIsAdmin(value) {
        this.setState({
            memberIsAdmin: value
        });
    }

    load() {
        var member = client.db.members.findById(this.props.memberId);

        var memberName = (member.name || '');
        var memberIsAdmin;

        if(member.role === 'member') { memberIsAdmin = false; }
        else if(member.role === 'admin') { memberIsAdmin = true; }

        this.setState(this.initialState);

        this.setState({
            memberName: memberName,
            memberIsAdmin: memberIsAdmin
        });
    }

    async submit() {
        if(this.state.loading) { return; }

        this.setState({
            loading: true
        });

        var memberName = this.state.memberName;
        var memberIsAdmin = this.state.memberIsAdmin;

        var success = await client.utils.updateMember(this.props.memberId, memberName, memberIsAdmin);
        if(!success) {
            this.handleError();
            return;
        }

        this.setState({
            loading: false
        });
    }

    componentDidMount() {
        this.init();
    }

    render() {
        var member = (client.db.members.findById(this.props.memberId) || {});
        var user = (client.db.users.findById(member.userId) || {});

        var hasPermissionToUpdateMemberName = client.permission.hasToUpdateMemberName(member._id);
        var hasPermissionToUpdateRole = client.permission.hasToUpdateRole(member._id);

        var userIsOnline = client.utils.isUserOnline(user._id);

        return (
            <MemberFormUi
                memberId={member._id}
                memberName={this.state.memberName}
                userId={user._id}
                username={user.username}
                memberIsAdmin={this.state.memberIsAdmin}
                userIsOnline={userIsOnline}
                hasPermissionToUpdateMemberName={hasPermissionToUpdateMemberName}
                hasPermissionToUpdateRole={hasPermissionToUpdateRole}
                loading={this.state.loading}
                onMemberNameChange={this.updateMemberName}
                onMemberIsAdminChange={this.updateMemberIsAdmin}
                onSubmit={this.submit}
            />
        );
    }
}

export default MemberForm;
