import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SendMessageAttachFileUi from '../UiComponents/SendMessageAttachFileUi/SendMessageAttachFileUi';

class SendMessageAttachFile extends Component {
    static propTypes = {
        filenames: (PropTypes.arrayOf(PropTypes.string)),
        mode: PropTypes.string,
        onFileAdd: PropTypes.func,
        onFileRemove: PropTypes.func
    };

    render() {
        return (
            <SendMessageAttachFileUi
                filenames={this.props.filenames}
                mode={this.props.mode}
                onFileAdd={this.props.onFileAdd}
                onFileRemove={this.props.onFileRemove}
            />
        );
    }
}

export default SendMessageAttachFile;
