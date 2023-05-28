import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './SettingsFormUi.module.css';
import envelopeSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/envelope-solid-light-icon.png';
import userSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/user-solid-light-icon.png';
import keySolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/key-solid-light-icon.png';
import SettingsAvatar from '../../WholeComponents/SettingsAvatar';
import FormField from '../../WholeComponents/FormField';
import SettingsLogout from '../../WholeComponents/SettingsLogout';
import SettingsDeleteAccount from '../../WholeComponents/SettingsDeleteAccount';
import FormButton from '../../WholeComponents/FormButton';

class SettingsFormUi extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);;
    }

    static propTypes = {
        emailAddress: PropTypes.string,
        username: PropTypes.string,
        newPassword: PropTypes.string,
        avatarFileUrl: PropTypes.string,
        loading: PropTypes.bool,
        onEmailAddressChange: PropTypes.func,
        onUsernameChange: PropTypes.func,
        onNewPasswordChange: PropTypes.func,
        onAvatarChange: PropTypes.func,
        onSubmit: PropTypes.func
    };

    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit();
    }

    render() {
        return (
            <div className={style.wrap}>
                <form className={style.form} autoComplete='off' spellCheck={false} onSubmit={this.onSubmit}>
                    <div className={style.top}>
                        <SettingsAvatar fileUrl={this.props.avatarFileUrl} onChange={this.props.onAvatarChange} />
                        <div className={style.rightTop}>
                            <FormField
                                type='email'
                                value={this.props.emailAddress}
                                placeholder='Email'
                                icon={envelopeSolidLightIcon}
                                onChange={this.props.onEmailAddressChange}
                            />
                            <FormField
                                type='text'
                                value={this.props.username}
                                placeholder='Username'
                                icon={userSolidLightIcon}
                                onChange={this.props.onUsernameChange}
                            />
                        </div>
                    </div>
                    <div className={style.middle}>
                        <FormField
                            type='password'
                            value={this.props.newPassword}
                            placeholder='New Password'
                            icon={keySolidLightIcon}
                            onChange={this.props.onNewPasswordChange}
                        />
                    </div>
                    <div className={style.bottom}>
                        <div className={style.topBottom}>
                            <SettingsLogout />
                            <SettingsDeleteAccount />
                        </div>
                        <FormButton type='submit' text='Save' width='100%' color='#2CA05A' solid={true} loading={this.props.loading} />
                    </div>
                </form>
            </div>
        );
    }
}

export default SettingsFormUi;
