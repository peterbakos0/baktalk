import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomSettingsIconUi.module.css';
import RoomIcon from '../../WholeComponents/RoomIcon';
import ChangeableImage from '../../WholeComponents/ChangeableImage';

class RoomSettingsIconUi extends Component {
    static propTypes = {
        roomId: PropTypes.string,
        fileUrl: PropTypes.string,
        hasPermission: PropTypes.bool,
        onChange: PropTypes.func
    };

    render() {
        var iconComponent = (<RoomIcon roomId={this.props.roomId} sizePx={192} />);

        return (
            <div className={style.wrap}>
                {(
                    this.props.hasPermission ?
                    <ChangeableImage
                        fileUrl={this.props.fileUrl}
                        hoverText='Change Icon'
                        onChange={this.props.onChange}
                    >
                        {iconComponent}
                    </ChangeableImage>
                    : iconComponent
                )}
            </div>
        );
    }
}

export default RoomSettingsIconUi;
