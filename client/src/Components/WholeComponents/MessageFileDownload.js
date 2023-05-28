import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import MessageFileDownloadUi from '../UiComponents/MessageFileDownloadUi/MessageFileDownloadUi';

class MessageFileDownload extends Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.uninit = this.uninit.bind(this);
        this.handleError = this.handleError.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.rerender = this.rerender.bind(this);

        this.shallDownload = false;
    }

    static propTypes = {
        fileId: PropTypes.string
    };

    init() {
        client.on('change', this.rerender);
    }

    uninit() {
        client.off('change', this.rerender);
    }

    handleError() {
        console.error(new Error());
    }

    async downloadFile() {
        var fileIsCompletelyLoaded = client.db.files.exists({
            _id: this.props.fileId,
            url: {
                $ne: undefined
            }
        });
        if(fileIsCompletelyLoaded) { return; }

        this.shallDownload = true;

        var success = await client.dbManager.loadFilesCompletely([this.props.fileId]);
        if(!success) { this.handleError(); }
    }

    rerender() {
        this.forceUpdate();
    }

    componentWillUnmount() {
        this.uninit();
    }

    componentDidUpdate() {
        this.shallDownload = false;
    }

    componentDidMount() {
        this.init();
    }

    render() {
        var file = (client.db.files.findById(this.props.fileId) || {});

        return (<MessageFileDownloadUi filename={file.filename} fileUrl={file.url} shallDownload={this.shallDownload} onClick={this.downloadFile} />);
    }
}

export default MessageFileDownload;
