import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './SendMessageModeBarUi.module.css';
import replySolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/reply-solid-light-icon.png';
import penSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/pen-solid-light-icon.png';
import timesSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/times-solid-light-icon.png';

class SendMessageModeBarUi extends Component {
    static propTypes = {
        mode: PropTypes.string,
        reMessageAuthorName: PropTypes.string,
        editMessageText: PropTypes.string,
        onClose: PropTypes.func
    };

    render() {
        var icon;
        var textElement;

        if(this.props.mode === 'send') {
            return null;
        }
        else if(this.props.mode === 'reply') {
            icon = replySolidLightIcon;

            textElement = (
                <label className={style.text + ' ' + style.replyText}>
                    Replying to <span>{this.props.reMessageAuthorName}</span>
                </label>
            );
        }
        else if(this.props.mode === 'edit') {
            icon = penSolidLightIcon;

            textElement = (
                <label className={style.text + ' ' + style.editText}>
                    Editing <span>{this.props.editMessageText}</span>
                </label>
            );
        }
        else if(this.props.mode === 'filter') {
            return null;
        }

        return (
            <div className={style.wrap}>
                <div className={style.left}>
                    <img className={style.icon} src={icon} />
                    {textElement}
                </div>
                <img className={style.close} src={timesSolidLightIcon} onClick={this.props.onClose} />
            </div>
        );
    }
}

export default SendMessageModeBarUi;
