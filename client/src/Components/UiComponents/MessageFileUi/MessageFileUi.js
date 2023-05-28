import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessageFileUi.module.css';
import MessageFileInfo from '../../WholeComponents/MessageFileInfo';
import MessageFilePreview from '../../WholeComponents/MessageFilePreview';

class MessageFileUi extends Component {
    static propTypes = {
        fileId: PropTypes.string,
        showPreview: PropTypes.bool,
        onShowPreviewChange: PropTypes.func
    };

    render() {
        return (
            <div className={style.wrap}>
                <MessageFileInfo fileId={this.props.fileId} showPreview={this.props.showPreview} onShowPreviewChange={this.props.onShowPreviewChange} />
                <MessageFilePreview fileId={this.props.fileId} showPreview={this.props.showPreview} />
            </div>
        );
    }
}

export default MessageFileUi;
