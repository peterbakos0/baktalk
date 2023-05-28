import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import MessageFilesUi from '../UiComponents/MessageFilesUi/MessageFilesUi';

class MessageFiles extends Component {
    static propTypes = {
        messageId: PropTypes.string,
        showAuthor: PropTypes.bool
    };

    render() {
        var message = client.db.messages.findById(this.props.messageId);

        return (<MessageFilesUi fileIds={message.fileIds} showAuthor={this.props.showAuthor} />);
    }
}

export default MessageFiles;
