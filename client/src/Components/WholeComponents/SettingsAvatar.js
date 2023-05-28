import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import SettingsAvatarUi from '../UiComponents/SettingsAvatarUi/SettingsAvatarUi';

class SettingsAvatar extends Component {
    static propTypes = {
        fileUrl: PropTypes.string,
        onChange: PropTypes.func
    };

    render() {
        return (<SettingsAvatarUi userId={client.auth.credentials.userId} fileUrl={this.props.fileUrl} onChange={this.props.onChange} />);
    }
}

export default SettingsAvatar;
