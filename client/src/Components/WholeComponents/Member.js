import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MemberUi from '../UiComponents/MemberUi/MemberUi';

class Member extends Component {
    static propTypes = {
        memberId: PropTypes.string
    };

    render() {
        return (<MemberUi memberId={this.props.memberId} />);
    }
}

export default Member;
