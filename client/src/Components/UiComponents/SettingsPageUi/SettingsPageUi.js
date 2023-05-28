import React, { Component } from 'react';
import style from './SettingsPageUi.module.css';
import Settings from '../../WholeComponents/Settings';

class SettingsPageUi extends Component {
    render() {
        return (
            <div className={style.wrap}>
                <Settings />
            </div>
        );
    }
}

export default SettingsPageUi;
