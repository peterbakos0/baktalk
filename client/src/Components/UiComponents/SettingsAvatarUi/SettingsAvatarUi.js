import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './SettingsAvatarUi.module.css';
import ChangeableImage from '../../WholeComponents/ChangeableImage';
import Avatar from '../../WholeComponents/Avatar';

class SettingsAvatarUi extends Component {
    static propTypes = {
        userId: PropTypes.string,
        fileUrl: PropTypes.string,
        onChange: PropTypes.func
    };

    render() {
        return (
            <div className={style.wrap}>
                <ChangeableImage fileUrl={this.props.fileUrl} hoverText='Change Avatar' onChange={this.props.onChange}>
                    <Avatar userId={this.props.userId} sizePx={192} />
                </ChangeableImage>
            </div>
        );
    }
}

export default SettingsAvatarUi;
