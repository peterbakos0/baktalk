import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessageDeleteOptionUi.module.css';
import trashSolidIcon from '../../../assets/images/same-images/same-icons/solid-same-icons/trash-solid-icon.png';
import DropdownMenu from '../../WholeComponents/DropdownMenu';

class MessageDeleteOptionUi extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    static propTypes = {
        hasPermission: PropTypes.bool,
        onClick: PropTypes.func,
        onClose: PropTypes.func
    };

    onClick() {
        this.props.onClick();
        this.props.onClose();
    }

    render() {
        var hasPermission = this.props.hasPermission;
        if(!hasPermission) { return null; }

        return (
            <div className={style.wrap}>
                <DropdownMenu text='Delete' icon={trashSolidIcon} onClick={this.onClick} />
            </div>
        );
    }
}

export default MessageDeleteOptionUi;
