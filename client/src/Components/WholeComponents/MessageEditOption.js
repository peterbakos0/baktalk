import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import MessageEditOptionUi from '../UiComponents/MessageEditOptionUi/MessageEditOptionUi';

class MessageEditOption extends Component {
    constructor(props) {
        super(props);

        this.edit = this.edit.bind(this);
    }

    static propTypes = {
        messageId: PropTypes.string,
        onEdit: PropTypes.func,
        onClose: PropTypes.func
    };

    edit() {
        this.props.onEdit(this.props.messageId);
    }

    render() {
        var hasPermission = client.permission.hasToEditMessage(this.props.messageId);

        return (<MessageEditOptionUi hasPermission={hasPermission} onClick={this.edit} onClose={this.props.onClose} />);
    }
}

export default MessageEditOption;
