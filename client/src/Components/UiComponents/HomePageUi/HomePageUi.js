import React, { Component } from 'react';
import style from './HomePageUi.module.css';
import DirectMessagingRoutes from '../../WholeComponents/DirectMessagingRoutes';
import DirectMessagingBar from '../../WholeComponents/DirectMessagingBar';

class HomePageUi extends Component {
    render() {
        return (
            <div className={style.wrap}>
                <DirectMessagingRoutes />
                <DirectMessagingBar />
            </div>
        );
    }
}

export default HomePageUi;
