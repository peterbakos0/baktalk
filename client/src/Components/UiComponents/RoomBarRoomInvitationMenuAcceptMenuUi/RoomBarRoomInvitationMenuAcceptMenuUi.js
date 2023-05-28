import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomBarRoomInvitationMenuAcceptMenuUi.module.css';
import checkSolidIcon from '../../../assets/images/same-images/same-icons/solid-same-icons/check-solid-icon.png';

class RoomBarRoomInvitationMenuAcceptMenuUi extends Component {
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
                <img className={style.icon} src={checkSolidIcon} />
            </div>
        );
    }
}

export default RoomBarRoomInvitationMenuAcceptMenuUi;
