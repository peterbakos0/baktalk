import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './DotsLoaderUi.module.css';

class DotsLoaderUi extends Component {
    static propTypes = {
        color: PropTypes.string
    };

    render() {
        return (
            <div className={style.wrap}>
                <div
                    className={style.dot + ' ' + style.dot1}
                    style={{
                        backgroundColor: this.props.color
                    }}
                ></div>
                <div
                    className={style.dot + ' ' + style.dot2}
                    style={{
                        backgroundColor: this.props.color
                    }}
                ></div>
                <div
                    className={style.dot + ' ' + style.dot3}
                    style={{
                        backgroundColor: this.props.color
                    }}
                ></div>
            </div>
        );
    }
}

export default DotsLoaderUi;
