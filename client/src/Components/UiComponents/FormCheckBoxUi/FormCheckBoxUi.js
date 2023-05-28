import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './FormCheckBoxUi.module.css';
import checkedImage from '../../../assets/images/same-images/checked-image.png';

class FormCheckBoxUi extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    static propTypes = {
        text: PropTypes.string,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        onChange: PropTypes.func
    };

    onClick() {
        if(this.props.disabled) { return; }

        this.props.onChange(!(this.props.checked));
    }

    render() {
        return (
            <div className={style.wrap}>
                <div
                    className={(style.checkBox + ' ' + (this.props.disabled ? style.disabledCheckBox : style.enabledCheckBox))}
                    onClick={this.onClick}
                >
                    {(this.props.checked ? <img className={style.image} src={checkedImage} /> : null)}
                </div>
                <label className={style.text}>{this.props.text}</label>
            </div>
        );
    }
}

export default FormCheckBoxUi;
