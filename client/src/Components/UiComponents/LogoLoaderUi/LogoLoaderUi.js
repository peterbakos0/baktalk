import React, { Component } from 'react';
import style from './LogoLoaderUi.module.css';
import logo from '../../../assets/images/same-images/logo.png';

class LogoLoaderUi extends Component {
    render() {
        return (
            <div className={style.wrap}>
                <img
                    className={style.logo}
                    src={logo}
                />
            </div>
        );
    }
}

export default LogoLoaderUi;
