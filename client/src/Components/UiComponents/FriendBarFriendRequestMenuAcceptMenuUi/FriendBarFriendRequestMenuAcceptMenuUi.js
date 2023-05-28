import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './FriendBarFriendRequestMenuAcceptMenuUi.module.css';
import checkSolidIcon from '../../../assets/images/same-images/same-icons/solid-same-icons/check-solid-icon.png';

class FriendBarFriendRequestMenuAcceptMenuUi extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    static propTypes = {
        hasPermission: PropTypes.bool,
        onClick: PropTypes.func
    };

    onClick() {
        this.props.onClick();
    }

    render() {
        var hasPermission = this.props.hasPermission;
        if(!hasPermission) { return null; }

        return (
            <div className={style.wrap} onClick={this.onClick}>
                <img className={style.icon} src={checkSolidIcon} />
            </div>
        );
    }
}

export default FriendBarFriendRequestMenuAcceptMenuUi;
