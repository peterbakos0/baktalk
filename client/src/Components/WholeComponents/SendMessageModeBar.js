import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import SendMessageModeBarUi from '../UiComponents/SendMessageModeBarUi/SendMessageModeBarUi';

class SendMessageModeBar extends Component {
    static propTypes = {
        mode: PropTypes.string,
        reMessageId: PropTypes.string,
        editMessageId: PropTypes.string,
        onModeReset: PropTypes.func
    };

    render() {
        var reMessageAuthorName = client.utils.getMessageAuthorName(this.props.reMessageId);
        var editMessage = (client.db.messages.findById(this.props.editMessageId) || {});

        return (
            <SendMessageModeBarUi
                mode={this.props.mode}
                reMessageAuthorName={reMessageAuthorName}
                editMessageText={editMessage.text}
                onClose={this.props.onModeReset}
            />
        );
    }
}

export default SendMessageModeBar;
