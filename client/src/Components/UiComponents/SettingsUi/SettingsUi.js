import React, { Component } from 'react';
import style from './SettingsUi.module.css';
import SettingsForm from '../../WholeComponents/SettingsForm';

class SettingsUi extends Component {
    render() {
        return (
            <div className={style.wrap}>
                <SettingsForm />
            </div>
        );
    }
}

export default SettingsUi;
