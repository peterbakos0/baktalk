import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessageReplyOptionUi.module.css';
import replySolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/reply-solid-light-icon.png';
import DropdownMenu from '../../WholeComponents/DropdownMenu';

class MessageReplyOptionUi extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    static propTypes = {
        onClick: PropTypes.func,
        onClose: PropTypes.func
    };

    onClick() {
        this.props.onClick();
        this.props.onClose();
    }

    render() {
        return (
            <div className={style.wrap}>
                <DropdownMenu text='Reply' icon={replySolidLightIcon} onClick={this.onClick} />
            </div>
        );
    }
}

export default MessageReplyOptionUi;
