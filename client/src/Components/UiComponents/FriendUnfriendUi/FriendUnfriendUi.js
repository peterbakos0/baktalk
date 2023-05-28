import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './FriendUnfriendUi.module.css';
import FormButton from '../../WholeComponents/FormButton';

class FriendUnfriendUi extends Component {
    static propTypes = {
        loading: PropTypes.bool,
        onClick: PropTypes.func
    };

    render() {
        return (
            <div className={style.wrap}>
                <FormButton type='button' text='Unfriend' color='#FF5555' solid={true} loading={this.props.loading} onClick={this.props.onClick} />
            </div>
        );
    }
}

export default FriendUnfriendUi;
