import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './AvatarUi.module.css';
import defaultAvatar from '../../../assets/images/same-images/default-avatar.png';
import Image from '../../WholeComponents/Image';

class AvatarUi extends Component {
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
                <Image fileId={this.props.fileId} defaultImage={defaultAvatar} />
            </div>
        );
    }
}

export default AvatarUi;
