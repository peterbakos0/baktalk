import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SendMessageTextBoxUi from '../UiComponents/SendMessageTextBoxUi/SendMessageTextBoxUi';

class SendMessageTextBox extends Component {
    static propTypes = {
        messageText: PropTypes.string,
        onChange: PropTypes.func,
        onSubmit: PropTypes.func
    };

    render() {
        return (<SendMessageTextBoxUi messageText={this.props.messageText} onChange={this.props.onChange} onSubmit={this.props.onSubmit} />);
    }
}

export default SendMessageTextBox;
