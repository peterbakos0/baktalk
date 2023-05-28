import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import previewTypes from '../../constants/preview-types';
import MessageFileArrowUi from '../UiComponents/MessageFileArrowUi/MessageFileArrowUi';

class MessageFileArrow extends Component {
    static propTypes = {
        fileId: PropTypes.string,
        showPreview: PropTypes.bool,
        onChange: PropTypes.func
    };

    render() {
        var file = client.db.files.findById(this.props.fileId);
        var hasPreview = previewTypes.includes(file.contentType);

        return (<MessageFileArrowUi hasPreview={hasPreview} showPreview={this.props.showPreview} onChange={this.props.onChange} />)
    }
}

export default MessageFileArrow;
