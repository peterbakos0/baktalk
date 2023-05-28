import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './FriendBarAddUi.module.css';
import SideBarCreate from '../../WholeComponents/SideBarCreate';

class FriendBarAddUi extends Component {
    static propTypes = {
        username: PropTypes.string,
        onUsernameChange: PropTypes.func,
        onSubmit: PropTypes.func
    };

    render() {
        return (
            <div className={style.wrap}>
                <SideBarCreate value={this.props.username} placeholder='Username' onChange={this.props.onUsernameChange} onSubmit={this.props.onSubmit} />
            </div>
        );
    }
}

export default FriendBarAddUi;
