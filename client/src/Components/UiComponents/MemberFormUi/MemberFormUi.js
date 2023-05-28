import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MemberFormUi.module.css';
import onlineIcon from '../../../assets/images/same-images/same-icons/online-icon.png';
import offlineIcon from '../../../assets/images/same-images/same-icons/offline-icon.png';
import userSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/user-solid-light-icon.png';
import Avatar from '../../WholeComponents/Avatar';
import FormField from '../../WholeComponents/FormField';
import FormCheckBox from '../../WholeComponents/FormCheckBox';
import MemberKickMember from '../../WholeComponents/MemberKickMember';
import FormButton from '../../WholeComponents/FormButton';

class MemberFormUi extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    static propTypes = {
        memberId: PropTypes.string,
        memberName: PropTypes.string,
        userId: PropTypes.string,
        username: PropTypes.string,
        memberIsAdmin: PropTypes.bool,
        userIsOnline: PropTypes.bool,
        hasPermissionToUpdateMemberName: PropTypes.bool,
        hasPermissionToUpdateRole: PropTypes.bool,
        loading: PropTypes.bool,
        onMemberNameChange: PropTypes.func,
        onMemberIsAdminChange: PropTypes.func,
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
                        <Avatar userId={this.props.userId} sizePx={192} />
                        <div className={style.bottomTop}>
                            <img className={style.status} src={(this.props.userIsOnline ? onlineIcon : offlineIcon)} />
                            <label className={style.username}>{this.props.username}</label>
                        </div>
                    </div>
                    <div className={style.middle}>
                        <FormField
                            type='text'
                            value={this.props.memberName}
                            placeholder='Member Name'
                            disabled={!(this.props.hasPermissionToUpdateMemberName)}
                            icon={userSolidLightIcon}
                            onChange={this.props.onMemberNameChange}
                        />
                        <FormCheckBox
                            text='Admin'
                            checked={this.props.memberIsAdmin}
                            disabled={!(this.props.hasPermissionToUpdateRole)}
                            onChange={this.props.onMemberIsAdminChange}
                        />
                    </div>
                    <div className={style.bottom}>
                        <MemberKickMember memberId={this.props.memberId} />
                        {(
                            (this.props.hasPermissionToUpdateMemberName || this.props.hasPermissionToUpdateRole) ?
                            <FormButton type='submit' text='Save' width='100%' color='#2CA05A' solid={true} loading={this.props.loading} />
                            : null
                        )}
                    </div>
                </form>
            </div>
        );
    }
}

export default MemberFormUi;
