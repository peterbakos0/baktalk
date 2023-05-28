import React, { Component } from 'react';
import style from './DirectMessagingBarUi.module.css';
import DirectMessagingBarStart from '../../WholeComponents/DirectMessagingBarStart';
import DirectMessagingBarList from '../../WholeComponents/DirectMessagingBarList';

class DirectMessagingBarUi extends Component {
    render() {
        return (
            <div className={style.wrap}>
                <DirectMessagingBarStart />
                <DirectMessagingBarList />
            </div>
        );
    }
}

export default DirectMessagingBarUi;
