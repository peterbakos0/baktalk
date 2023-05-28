import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormButtonUi from '../UiComponents/FormButtonUi/FormButtonUi';

class FormButton extends Component {
    static propTypes = {
        type: PropTypes.string,
        text: PropTypes.string,
        color: PropTypes.string,
        solid: PropTypes.bool,
        loading: PropTypes.bool,
        onClick: PropTypes.func
    };

    render() {
        return (
            <FormButtonUi
                type={this.props.type}
                text={this.props.text}
                color={this.props.color}
                solid={this.props.solid}
                loading={this.props.loading}
                onClick={this.props.onClick}
            />
        );
    }
}

export default FormButton;
