import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessagingTopBarPinnedMenuUi.module.css';
import thumbtackSolidBlueIcon from '../../../assets/images/blue-images/blue-icons/solid-blue-icons/thumbtack-solid-blue-icon.png';
import thumbtackSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/thumbtack-solid-light-icon.png';

class MessagingTopBarPinnedMenuUi extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    static propTypes = {
        messagesArePinnedFiltered: PropTypes.bool,
        onClick: PropTypes.func
    };

    onClick() {
        this.props.onClick();
    }

    render() {
        return (
            <div className={style.wrap} onClick={this.onClick}>
                <img className={style.icon} src={(this.props.messagesArePinnedFiltered ? thumbtackSolidBlueIcon : thumbtackSolidLightIcon)} />
            </div>
        );
    }
}

export default MessagingTopBarPinnedMenuUi;
