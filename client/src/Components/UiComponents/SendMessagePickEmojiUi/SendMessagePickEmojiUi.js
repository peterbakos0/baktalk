import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './SendMessagePickEmojiUi.module.css';
import smileSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/smile-solid-light-icon.png';
import EmojiPicker from '../../WholeComponents/EmojiPicker';

class SendMessagePickEmojiUi extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onEmojiPickerClose = this.onEmojiPickerClose.bind(this);

        this.state = {
            event: null
        };
    }

    static propTypes = {
        onEmojiSelect: PropTypes.func
    };

    onClick(event) {
        this.setState({
            event: event
        });
    }

    onEmojiPickerClose() {
        this.setState({
            event: null
        });
    };

    render() {
        return (
            <div className={style.wrap}>
                <img className={style.icon} src={smileSolidLightIcon} onClick={this.onClick} />
                <EmojiPicker event={this.state.event} onSelect={this.props.onEmojiSelect} onClose={this.onEmojiPickerClose} />
            </div>
        );
    }
}

export default SendMessagePickEmojiUi;
