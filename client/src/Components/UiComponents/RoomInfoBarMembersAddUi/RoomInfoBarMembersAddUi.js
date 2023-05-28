import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomInfoBarMembersAddUi.module.css';
import SideBarCreate from '../../WholeComponents/SideBarCreate';

class RoomInfoBarMembersAddUi extends Component {
    static propTypes = {
        username: PropTypes.string,
        hasPermission: PropTypes.bool,
        onUsernameChange: PropTypes.func,
        onSubmit: PropTypes.func
    };

    render() {
        var hasPermission = this.props.hasPermission;
        if(!hasPermission) { return null; }

        return (
            <div className={style.wrap}>
                <SideBarCreate
                    value={this.props.username}
                    placeholder='Username'
                    onChange={this.props.onUsernameChange}
                    onSubmit={this.props.onSubmit}
                />
            </div>
        );
    }
}

export default RoomInfoBarMembersAddUi;
