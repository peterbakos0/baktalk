import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomIconUi.module.css';
import defaultRoomIcon from '../../../assets/images/same-images/default-room-icon.png';
import Image from '../../WholeComponents/Image';

class RoomIconUi extends Component {
    static propTypes = {
        fileId: PropTypes.string,
        sizePx: PropTypes.number
    };

    render() {
        return (
            <div
                className={style.wrap}
                style={{
                    width: (this.props.sizePx + 'px'),
                    height: (this.props.sizePx + 'px')
                }}
            >
                <Image fileId={this.props.fileId} defaultImage={defaultRoomIcon} />
            </div>
        );
    }
}

export default RoomIconUi;
