import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import AuthUi from '../UiComponents/AuthUi/AuthUi';

class Auth extends Component {
    static propTypes = {
        titleText: PropTypes.string,
        fields: (PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string,
            value: PropTypes.string,
            placeholder: PropTypes.string,
            autoFocus: PropTypes.bool,
            icon: PropTypes.string,
            onChange: PropTypes.func
        }))),
        submitText: PropTypes.string,
        buttonText: PropTypes.string,
        buttonTo: PropTypes.string,
        loading: PropTypes.bool,
        onSubmit: PropTypes.func
    };

    render() {
        var credentialsExists = client.auth.credentials.exists();

        return (
            <AuthUi
                titleText={this.props.titleText}
                fields={this.props.fields}
                submitText={this.props.submitText}
                buttonText={this.props.buttonText}
                buttonTo={this.props.buttonTo}
                loading={this.props.loading}
                credentialsExists={credentialsExists}
                onSubmit={this.props.onSubmit}
            />
        );
    }
}

export default Auth;
