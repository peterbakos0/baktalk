import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './RoomInfoBarMembersMemberMenusUi.module.css';
import getMemberPath from '../../../utils/path/get-member-path';
import RoomInfoBarMembersMemberMenu from '../../WholeComponents/RoomInfoBarMembersMemberMenu';

class RoomInfoBarMembersMemberMenusUi extends Component {
    static propTypes = {
        roomId: PropTypes.string,
        memberIds: (PropTypes.arrayOf(PropTypes.string))
    };

    render() {
        var memberIds = this.props.memberIds;

        var menuComponents = [];
        for(var i = 0; i < memberIds.length; i++) {
            var memberId = memberIds[i];

            var memberPath = getMemberPath(memberId, this.props.roomId);

            menuComponents.push(
                <Link className={style.menuLink} to={memberPath} key={memberId}>
                    <RoomInfoBarMembersMemberMenu memberId={memberId} />
                </Link>
            );
        }

        return (<div className={style.wrap}>{menuComponents}</div>);
    }
}

export default RoomInfoBarMembersMemberMenusUi;
