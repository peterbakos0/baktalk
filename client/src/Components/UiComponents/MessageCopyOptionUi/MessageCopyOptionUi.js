import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import style from './MessageCopyOptionUi.module.css';
import copySolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/copy-solid-light-icon.png';
import DropdownMenu from '../../WholeComponents/DropdownMenu';

class MessageCopyOptionUi extends Component {
    constructor(props) {
        super(props);

        this.copyRef = createRef();

        this.onClick = this.onClick.bind(this);
    }

    static propTypes = {
        messageText: PropTypes.string,
        onClose: PropTypes.func
    };

    onClick() {
        this.copyRef.current.value = this.props.messageText;
        this.copyRef.current.select();

        document.execCommand('copy');

        this.copyRef.current.blur();
        this.copyRef.current.value = '';

        this.props.onClose();
    }

    render() {
        var messageText = this.props.messageText;
        if(messageText.length <= 0) { return null; }

        return (
            <div className={style.wrap}>
                <DropdownMenu text='Copy' icon={copySolidLightIcon} onClick={this.onClick} />
                <input className={style.copy} ref={this.copyRef} type='text' />
            </div>
        );
    }
}

export default MessageCopyOptionUi;
