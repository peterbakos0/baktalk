import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessagePinOptionUi.module.css';
import thumbtackSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/thumbtack-solid-light-icon.png';
import DropdownMenu from '../../WholeComponents/DropdownMenu';

class MessagePinOptionUi extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    static propTypes = {
        messagePinned: PropTypes.bool,
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
                <DropdownMenu text={(this.props.messagePinned ? 'Unpin' : 'Pin')} icon={thumbtackSolidLightIcon} onClick={this.onClick} />
            </div>
        );
    }
}

export default MessagePinOptionUi;
