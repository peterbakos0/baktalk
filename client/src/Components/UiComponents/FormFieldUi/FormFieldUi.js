import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './FormFieldUi.module.css';

class FormFieldUi extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    static propTypes = {
        type: PropTypes.string,
        value: PropTypes.string,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        autoFocus: PropTypes.bool,
        icon: PropTypes.string,
        onChange: PropTypes.func
    };

    onChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return (
            <div className={style.wrap}>
                <input
                    className={style.textBox}
                    type={this.props.type}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    disabled={this.props.disabled}
                    autoFocus={this.props.autoFocus}
                    onChange={this.onChange}
                />
                <img className={style.icon} src={this.props.icon} />
            </div>
        );
    }
}

export default FormFieldUi;
