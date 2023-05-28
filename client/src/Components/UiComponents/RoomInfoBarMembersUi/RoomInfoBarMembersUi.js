import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomInfoBarMembersUi.module.css';
import SideBarCategory from '../../WholeComponents/SideBarCategory';
import RoomInfoBarMembersAdd from '../../WholeComponents/RoomInfoBarMembersAdd';
import RoomInfoBarMembersList from '../../WholeComponents/RoomInfoBarMembersList';

class RoomInfoBarMembersUi extends Component {
    static propTypes = {
        roomId: PropTypes.string
    };

    render() {
        return (
            <div className={style.wrap}>
                <SideBarCategory name='Members'>
                    <RoomInfoBarMembersAdd roomId={this.props.roomId} />
                    <RoomInfoBarMembersList roomId={this.props.roomId} />
                </SideBarCategory>
            </div>
        );
    }
}

export default RoomInfoBarMembersUi;
