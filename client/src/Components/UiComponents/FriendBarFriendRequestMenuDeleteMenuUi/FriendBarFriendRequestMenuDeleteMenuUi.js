import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './FriendBarFriendRequestMenuDeleteMenuUi.module.css';
import timesSolidIcon from '../../../assets/images/same-images/same-icons/solid-same-icons/times-solid-icon.png';

class FriendBarFriendRequestMenuDeleteMenuUi extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    static propTypes = {
        onClick: PropTypes.func
    };

    onClick() {
        this.props.onClick();
    }

    render() {
        return (
            <div className={style.wrap} onClick={this.onClick}>
                <img className={style.icon} src={timesSolidIcon} />
            </div>
        );
    }
}

export default FriendBarFriendRequestMenuDeleteMenuUi;
