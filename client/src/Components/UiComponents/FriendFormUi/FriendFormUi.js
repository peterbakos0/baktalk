import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './FriendFormUi.module.css';
import onlineIcon from '../../../assets/images/same-images/same-icons/online-icon.png';
import offlineIcon from '../../../assets/images/same-images/same-icons/offline-icon.png';
import Avatar from '../../WholeComponents/Avatar';
import FriendUnfriend from '../../WholeComponents/FriendUnfriend';

class FriendFormUi extends Component {
    static propTypes = {
        friendId: PropTypes.string,
        userId: PropTypes.string,
        username: PropTypes.string,
        userIsOnline: PropTypes.bool
    };

    render() {
        return (
            <div className={style.wrap}>
                <form className={style.form}>
                    <Avatar userId={this.props.userId} sizePx={192} />
                    <div className={style.middle}>
                        <img className={style.status} src={(this.props.userIsOnline ? onlineIcon : offlineIcon)} />
                        <label className={style.username}>{this.props.username}</label>
                    </div>
                    <FriendUnfriend friendId={this.props.friendId} />
                </form>
            </div>
        );
    }
}

export default FriendFormUi;
