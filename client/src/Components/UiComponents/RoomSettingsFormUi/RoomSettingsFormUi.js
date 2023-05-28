import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './RoomSettingsFormUi.module.css';
import usersSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/users-solid-light-icon.png';
import RoomSettingsIcon from '../../WholeComponents/RoomSettingsIcon';
import FormField from '../../WholeComponents/FormField';
import RoomSettingsLeaveRoom from '../../WholeComponents/RoomSettingsLeaveRoom';
import RoomSettingsDeleteRoom from '../../WholeComponents/RoomSettingsDeleteRoom';
import FormButton from '../../WholeComponents/FormButton';

class RoomSettingsFormUi extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    static propTypes = {
        roomId: PropTypes.string,
        roomName: PropTypes.string,
        iconFileUrl: PropTypes.string,
        hasPermission: PropTypes.bool,
        loading: PropTypes.bool,
        onRoomNameChange: PropTypes.func,
        onIconChange: PropTypes.func,
        onSubmit: PropTypes.func
    };

    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit();
    }

    render() {
        return (
            <div className={style.wrap}>
                <form className={style.form} autoComplete='off' spellCheck={false} onSubmit={this.onSubmit}>
                    <div className={style.top}>
                        <RoomSettingsIcon
                            roomId={this.props.roomId}
                            fileUrl={this.props.iconFileUrl}
                            hasPermission={this.props.hasPermission}
                            onChange={this.props.onIconChange}
                        />
                        <div className={style.rightTop}>
                            <FormField
                                type='text'
                                value={this.props.roomName}
                                placeholder='Room Name'
                                disabled={!(this.props.hasPermission)}
                                icon={usersSolidLightIcon}
                                onChange={this.props.onRoomNameChange}
                            />
                            <RoomSettingsLeaveRoom roomId={this.props.roomId} />
                        </div>
                    </div>
                    <div className={style.bottom}>
                        <RoomSettingsDeleteRoom roomId={this.props.roomId} />
                        {(
                            this.props.hasPermission ?
                            <div className={style.submitContainer}>
                                <FormButton type='submit' text='Save' color='#2CA05A' solid={true} loading={this.props.loading} />
                            </div>
                            : null
                        )}
                    </div>
                </form>
            </div>
        );
    }
}

export default RoomSettingsFormUi;
