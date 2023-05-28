import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import MessageFileInfoUi from '../UiComponents/MessageFileInfoUi/MessageFileInfoUi';

class MessageFileInfo extends Component {
    static propTypes = {
        fileId: PropTypes.string,
        showPreview: PropTypes.bool,
        onShowPreviewChange: PropTypes.func
    };

    render() {
        var file = client.db.files.findById(this.props.fileId);

        return (
            <MessageFileInfoUi
                fileId={file._id}
                filename={file.filename}
                showPreview={this.props.showPreview}
                onShowPreviewChange={this.props.onShowPreviewChange}
            />
        );
    }
}

export default MessageFileInfo;
