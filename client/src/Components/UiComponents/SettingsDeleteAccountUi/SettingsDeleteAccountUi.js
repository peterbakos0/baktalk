import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './SettingsDeleteAccountUi.module.css';
import FormButton from '../../WholeComponents/FormButton';

class SettingsDeleteAccountUi extends Component {
    static propTypes = {
        loading: PropTypes.bool,
        onClick: PropTypes.func
    };

    render() {
        return (
            <div className={style.wrap}>
                <FormButton
                    type='button'
                    text='Delete Account'
                    width='100%'
                    color='#AA0000'
                    solid={true}
                    loading={this.props.loading}
                    onClick={this.props.onClick}
                />
            </div>
        );
    }
}

export default SettingsDeleteAccountUi;
