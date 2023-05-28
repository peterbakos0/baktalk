import React, { Component } from 'react';
import client from '../../client';
import SettingsFormUi from '../UiComponents/SettingsFormUi/SettingsFormUi';

class SettingsForm extends Component {
    constructor() {
        super();

        this.init = this.init.bind(this);
        this.handleError = this.handleError.bind(this);
        this.updateEmailAddress = this.updateEmailAddress.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updateNewPassword = this.updateNewPassword.bind(this);
        this.changeAvatar = this.changeAvatar.bind(this);
        this.load = this.load.bind(this);
        this.submit = this.submit.bind(this);

        this.initialState = {
            emailAddress: '',
            username: '',
            newPassword: '',
            avatarFile: null,
            avatarFileUrl: null,
            loading: false
        };

        this.state = this.initialState;
    }

    init() {
        this.load();
    }

    handleError() {
        console.error(new Error());
        this.load();
    }

    updateEmailAddress(value) {
        this.setState({
            emailAddress: value
        });
    }

    updateUsername(value) {
        this.setState({
            username: value
        });
    }

    updateNewPassword(value) {
        this.setState({
            newPassword: value
        });
    }

    changeAvatar(avatarFile) {
        var avatarFileUrl = URL.createObjectURL(avatarFile);

        this.setState({
            avatarFile: avatarFile,
            avatarFileUrl: avatarFileUrl
        });
    }

    load() {
        var user = client.db.users.findById(client.auth.credentials.userId);

        this.setState(this.initialState);

        this.setState({
            emailAddress: user.emailAddress,
            username: user.username
        });
    }

    async submit() {
        if(this.state.loading) { return; }

        this.setState({
            loading: true
        });

        var emailAddress = this.state.emailAddress;
        var username = this.state.username;
        var newPassword = this.state.newPassword;
        var avatarFile = this.state.avatarFile;

        var success = await client.auth.updateUser(emailAddress, username, newPassword, avatarFile);
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
        return (
            <SettingsFormUi
                emailAddress={this.state.emailAddress}
                username={this.state.username}
                newPassword={this.state.newPassword}
                avatarFileUrl={this.state.avatarFileUrl}
                loading={this.state.loading}
                onEmailAddressChange={this.updateEmailAddress}
                onUsernameChange={this.updateUsername}
                onNewPasswordChange={this.updateNewPassword}
                onAvatarChange={this.changeAvatar}
                onSubmit={this.submit}
            />
        );
    }
}

export default SettingsForm;
