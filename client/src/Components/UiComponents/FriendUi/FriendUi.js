import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './FriendUi.module.css';
import FriendForm from '../../WholeComponents/FriendForm';

class FriendUi extends Component {
    static propTypes = {
        friendId: PropTypes.string
    };

    render() {
        return (
            <div className={style.wrap}>
                <FriendForm friendId={this.props.friendId} />
            </div>
        );
    }
}

export default FriendUi;
