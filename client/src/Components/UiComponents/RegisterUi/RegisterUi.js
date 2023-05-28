import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RegisterUi.module.css';
import getLoginPath from '../../../utils/path/get-login-path';
import envelopeSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/envelope-solid-light-icon.png';
import userSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/user-solid-light-icon.png';
import keySolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/key-solid-light-icon.png';
import Auth from '../../WholeComponents/Auth';

class RegisterUi extends Component {
    static propTypes = {
        emailAddress: PropTypes.string,
        username: PropTypes.string,
        password: PropTypes.string,
        loading: PropTypes.bool,
        onEmailAddressChange: PropTypes.func,
        onUsernameChange: PropTypes.func,
        onPasswordChange: PropTypes.func,
        onSubmit: PropTypes.func
    };

    render() {
        var loginPath = getLoginPath();

        return (
            <div className={style.wrap}>
                <Auth
                    titleText='Create Account'
                    fields={[
                        {
                            type: 'email',
                            value: this.props.emailAddress,
                            placeholder: 'Email',
                            autoFocus: true,
                            icon: envelopeSolidLightIcon,
                            onChange: this.props.onEmailAddressChange
                        },
                        {
                            type: 'text',
                            value: this.props.username,
                            placeholder: 'Username',
                            autoFocus: false,
                            icon: userSolidLightIcon,
                            onChange: this.props.onUsernameChange
                        },
                        {
                            type: 'password',
                            value: this.props.password,
                            placeholder: 'Password',
                            autoFocus: false,
                            icon: keySolidLightIcon,
                            onChange: this.props.onPasswordChange
                        }
                    ]}
                    submitText='Register'
                    buttonText='Login'
                    buttonTo={loginPath}
                    loading={this.props.loading}
                    onSubmit={this.props.onSubmit}
                />
            </div>
        );
    }
}

export default RegisterUi;
