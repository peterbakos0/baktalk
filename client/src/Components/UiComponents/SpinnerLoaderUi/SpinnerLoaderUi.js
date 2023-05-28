import React, { Component } from 'react';
import style from './SpinnerLoaderUi.module.css';

class SpinnerLoaderUi extends Component {
    render() {
        return (
            <div className={style.wrap}>
                <div className={style.spinner}></div>
            </div>
        );
    }
}

export default SpinnerLoaderUi;
