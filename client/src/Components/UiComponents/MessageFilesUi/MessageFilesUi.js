import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessageFilesUi.module.css';
import MessageFile from '../../WholeComponents/MessageFile';

class MessageFilesUi extends Component {
    static propTypes = {
        fileIds: (PropTypes.arrayOf(PropTypes.string))
    };

    render() {
        var fileIds = this.props.fileIds;
        if(fileIds.length <= 0) { return null; }

        var fileComponents = [];
        for(var i = 0; i < fileIds.length; i++) {
            var fileId = fileIds[i];
            fileComponents.push(<MessageFile fileId={fileId} key={fileId} />);
        }

        return (<div className={style.wrap}>{fileComponents}</div>);
    }
}

export default MessageFilesUi;
