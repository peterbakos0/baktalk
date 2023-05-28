import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormFieldUi from '../UiComponents/FormFieldUi/FormFieldUi';

class FormField extends Component {
    static propTypes = {
        type: PropTypes.string,
        value: PropTypes.string,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        autoFocus: PropTypes.bool,
        icon: PropTypes.string,
        onChange: PropTypes.func
    };

    render() {
        return (
            <FormFieldUi
                type={this.props.type}
                value={this.props.value}
                placeholder={this.props.placeholder}
                disabled={this.props.disabled}
                autoFocus={this.props.autoFocus}
                icon={this.props.icon}
                onChange={this.props.onChange}
            />
        );
    }
}

export default FormField;
