import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MemberKickMemberUi.module.css';
import FormButton from '../../WholeComponents/FormButton';

class MemberKickMemberUi extends Component {
    static propTypes = {
        hasPermission: PropTypes.bool,
        loading: PropTypes.bool,
        onClick: PropTypes.func
    };

    render() {
        var hasPermission = this.props.hasPermission;
        if(!hasPermission) { return null; }

        return (
            <div className={style.wrap}>
                <FormButton type='button' text='Kick Member' color='#AA0000' solid={true} loading={this.props.loading} onClick={this.props.onClick} />
            </div>
        );
    }
}

export default MemberKickMemberUi;
