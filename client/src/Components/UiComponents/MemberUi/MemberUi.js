import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MemberUi.module.css';
import MemberForm from '../../WholeComponents/MemberForm';

class MemberUi extends Component {
    static propTypes = {
        memberId: PropTypes.string
    };

    render() {
        return (
            <div className={style.wrap}>
                <MemberForm memberId={this.props.memberId} />
            </div>
        );
    }
}

export default MemberUi;
