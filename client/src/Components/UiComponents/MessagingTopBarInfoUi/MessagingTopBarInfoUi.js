import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessagingTopBarInfoUi.module.css';
import onlineIcon from '../../../assets/images/same-images/same-icons/online-icon.png';
import offlineIcon from '../../../assets/images/same-images/same-icons/offline-icon.png';
import commentAltSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/comment-alt-solid-light-icon.png';

class MessagingTopBarInfoUi extends Component {
    static propTypes = {
        messageParentType: PropTypes.string,
        username: PropTypes.string,
        userIsOnline: PropTypes.bool,
        channelName: PropTypes.string
    };

    render() {
        var text;
        var icon;

        if(this.props.messageParentType === 'directMessaging') {
            text = this.props.username;

            if(this.props.userIsOnline) { icon = onlineIcon; }
            else { icon = offlineIcon; }
        }
        else if(this.props.messageParentType === 'channel') {
            text = this.props.channelName;
            icon = commentAltSolidLightIcon;
        }

        return (
            <div className={style.wrap}>
                <img className={style.icon} src={icon} />
                <label className={style.text}>{text}</label>
            </div>
        );
    }
}

export default MessagingTopBarInfoUi;
