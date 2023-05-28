import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './LoginUi.module.css';
import getRegisterPath from '../../../utils/path/get-register-path';
import userSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/user-solid-light-icon.png';
import keySolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/key-solid-light-icon.png';
import Auth from '../../WholeComponents/Auth';

class LoginUi extends Component {
    static propTypes = {
        username: PropTypes.string,
        password: PropTypes.string,
        loading: PropTypes.bool,
        onUsernameChange: PropTypes.func,
        onPasswordChange: PropTypes.func,
        onSubmit: PropTypes.func
    };

    render() {
        var registerPath = getRegisterPath();

        return (
            <div className={style.wrap}>
                <Auth
                    titleText='Welcome'
                    fields={[
                        {
                            type: 'text',
                            value: this.props.username,
                            placeholder: 'Username',
                            autoFocus: true,
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
                    submitText='Login'
                    buttonText='Register'
                    buttonTo={registerPath}
                    loading={this.props.loading}
                    onSubmit={this.props.onSubmit}
                />
            </div>
        );
    }
}

export default LoginUi;
