import React, { Component } from 'react';
import style from './BlankUi.module.css';
import ghostSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/ghost-solid-light-icon.png';

class BlankUi extends Component {
    render() {
        return (
            <div className={style.wrap}>
                <img
                    className={style.icon}
                    src={ghostSolidLightIcon}
                />
                <label className={style.text}>No stuff here</label>
            </div>
        );
    }
}

export default BlankUi;
