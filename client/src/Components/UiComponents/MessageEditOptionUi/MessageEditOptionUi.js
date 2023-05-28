import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessageEditOptionUi.module.css';
import penSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/pen-solid-light-icon.png';
import DropdownMenu from '../../WholeComponents/DropdownMenu';

class MessageEditOptionUi extends Component {
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
                <DropdownMenu text='Edit' icon={penSolidLightIcon} onClick={this.onClick} />
            </div>
        );
    }
}

export default MessageEditOptionUi;
