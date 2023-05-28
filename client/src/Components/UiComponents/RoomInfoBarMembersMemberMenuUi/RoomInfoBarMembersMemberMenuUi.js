import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomInfoBarMembersMemberMenuUi.module.css';
import getMemberPath from '../../../utils/path/get-member-path';
import SideBarMenu from '../../WholeComponents/SideBarMenu';
import Avatar from '../../WholeComponents/Avatar';

class RoomInfoBarMembersMemberMenuUi extends Component {
    static propTypes = {
        memberId: PropTypes.string,
        memberName: PropTypes.string,
        userId: PropTypes.string,
        roomId: PropTypes.string,
        userIsOnline: PropTypes.bool
    };

    render() {
        var memberPath = getMemberPath(this.props.memberId, this.props.roomId);
        var selected = window.location.pathname.startsWith(memberPath);

        return (
            <div className={style.wrap}>
                <SideBarMenu text={this.props.memberName} online={this.props.userIsOnline} selected={selected}>
                    <Avatar userId={this.props.userId} sizePx={32} />
                    {null}
                </SideBarMenu>
            </div>
        );
    }
}

export default RoomInfoBarMembersMemberMenuUi;
