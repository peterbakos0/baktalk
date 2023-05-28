import React, { Component } from 'react';
import client from '../../client';
import MainUi from '../UiComponents/MainUi/MainUi';

class Main extends Component {
    constructor() {
        super();

        this.init = this.init.bind(this);
        this.handleError = this.handleError.bind(this);

        this.state = {
            loading: true
        };
    }

    async init() {
        this.setState({
            loading: true
        });

        if(!(client.auth.clientToken)) {
            var success = await client.auth.login();
            if(!success) {
                this.handleError();
                return;
            }
        }

        if(!(client.db.hasUserData)) {
            var success = await client.dbManager.updateUserData();
            if(!success) {
                this.handleError();
                return;
            }
        }

        this.setState({
            loading: false
        });
    }

    handleError() {
        console.error(new Error());
        client.fullReset();
    }

    render() {
        var credentialsExists = client.auth.credentials.exists();

        return (<MainUi loading={this.state.loading} credentialsExists={credentialsExists} afterInit={this.init} />);
    }
}

export default Main;
