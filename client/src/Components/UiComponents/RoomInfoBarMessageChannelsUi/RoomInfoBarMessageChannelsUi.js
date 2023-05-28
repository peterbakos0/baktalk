import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomInfoBarMessageChannelsUi.module.css';
import SideBarCategory from '../../WholeComponents/SideBarCategory';
import RoomInfoBarMessageChannelsCreate from '../../WholeComponents/RoomInfoBarMessageChannelsCreate';
import RoomInfoBarMessageChannelsList from '../../WholeComponents/RoomInfoBarMessageChannelsList';

class RoomInfoBarMessageChannelsUi extends Component {
    static propTypes = {
        roomId: PropTypes.string
    };

    render() {
        return (
            <div className={style.wrap}>
                <SideBarCategory name='Message Channels'>
                    <RoomInfoBarMessageChannelsCreate roomId={this.props.roomId} />
                    <RoomInfoBarMessageChannelsList roomId={this.props.roomId} />
                </SideBarCategory>
            </div>
        );
    }
}

export default RoomInfoBarMessageChannelsUi;
