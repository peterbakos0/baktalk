import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './SettingsLogoutUi.module.css';
import FormButton from '../../WholeComponents/FormButton';

class SettingsLogoutUi extends Component {
    static propTypes = {
        onClick: PropTypes.func
    };

    render() {
        return (
            <div className={style.wrap}>
                <FormButton type='button' text='Logout' width='100%' color='#AA0000' solid={false} onClick={this.props.onClick} />
            </div>
        );
    }
}

export default SettingsLogoutUi;
