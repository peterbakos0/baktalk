import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessageFileInfoUi.module.css';
import fileSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/file-solid-light-icon.png';
import MessageFileArrow from '../../WholeComponents/MessageFileArrow';
import MessageFileDownload from '../../WholeComponents/MessageFileDownload';

class MessageFileInfoUi extends Component {
    static propTypes = {
        fileId: PropTypes.string,
        filename: PropTypes.string,
        showPreview: PropTypes.bool,
        onShowPreviewChange: PropTypes.func
    };

    render() {
        return(
            <div className={style.wrap}>
                <div className={style.left}>
                    <MessageFileArrow fileId={this.props.fileId} showPreview={this.props.showPreview} onChange={this.props.onShowPreviewChange} />
                    <img className={style.fileIcon} src={fileSolidLightIcon} />
                    <label className={style.filename} title={this.props.filename}>{this.props.filename}</label>
                </div>
                <MessageFileDownload fileId={this.props.fileId} />
            </div>
        );
    }
}

export default MessageFileInfoUi;
