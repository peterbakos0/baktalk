import React, { Component } from 'react';
import client from '../../client';
import SettingsLogoutUi from '../UiComponents/SettingsLogoutUi/SettingsLogoutUi';

class SettingsLogout extends Component {
    render() {
        return (<SettingsLogoutUi onClick={client.auth.logout} />)
    }
}

export default SettingsLogout;
