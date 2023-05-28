import React, { Component } from 'react';
import client from '../../client';
import LoginUi from '../UiComponents/LoginUi/LoginUi';

class Login extends Component {
    constructor() {
        super();

        this.init = this.init.bind(this);
        this.uninit = this.uninit.bind(this);
        this.handleError = this.handleError.bind(this);
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.submit = this.submit.bind(this);
        this.rerender = this.rerender.bind(this);

        this.state = {
            username: '',
            password: '',
            loading: false
        };
    }

    init() {
        client.on('change', this.rerender);
    }

    uninit() {
        client.off('change', this.rerender);
    }

    handleError() {
        console.error(new Error());
        client.fullReset();
    }

    updateUsername(value) {
        this.setState({
            username: value
        });
    }

    updatePassword(value) {
        this.setState({
            password: value
        });
    }

    async submit() {
        if(this.state.loading) { return; }

        this.setState({
            loading: true
        });

        var username = this.state.username;
        var password = this.state.password;

        var success = await client.auth.login(username, password);
        if(!success) { this.handleError(); }
    }

    rerender() {
        this.forceUpdate();
    }

    componentWillUnmount() {
        this.uninit();
    }

    componentDidMount() {
        this.init();
    }

    render() {
        return (
            <LoginUi
                username={this.state.username}
                password={this.state.password}
                loading={this.state.loading}
                onUsernameChange={this.updateUsername}
                onPasswordChange={this.updatePassword}
                onSubmit={this.submit}
            />
        );
    }
}

export default Login;
