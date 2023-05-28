import React, { Component } from 'react';
import client from '../../client';
import SettingsDeleteAccountUi from '../UiComponents/SettingsDeleteAccountUi/SettingsDeleteAccountUi';

class SettingsDeleteAccount extends Component {
    constructor() {
        super();

        this.handleError = this.handleError.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);

        this.initialState = {
            loading: false
        };

        this.state = this.initialState;
    }

    handleError() {
        console.error(new Error());
        this.setState(this.initialState);
    }

    async deleteAccount() {
        if(this.state.loading) { return; }

        this.setState({
            loading: true
        });

        var success = await client.auth.deleteUser();
        if(!success) { this.handleError(); }
    }

    render() {
        return (<SettingsDeleteAccountUi loading={this.state.loading} onClick={this.deleteAccount} />);
    }
}

export default SettingsDeleteAccount;
