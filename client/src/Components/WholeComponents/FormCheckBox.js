import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormCheckBoxUi from '../UiComponents/FormCheckBoxUi/FormCheckBoxUi';

class FormCheckBox extends Component {
    static propTypes = {
        text: PropTypes.string,
        checked: PropTypes.bool,
        disabled: PropTypes.bool,
        onChange: PropTypes.func
    };

    render() {
        return (<FormCheckBoxUi text={this.props.text} checked={this.props.checked} disabled={this.props.disabled} onChange={this.props.onChange} />);
    }
}

export default FormCheckBox;
