import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import MessageFilePreviewUi from '../UiComponents/MessageFilePreviewUi/MessageFilePreviewUi';

class MessageFilePreview extends Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.uninit = this.uninit.bind(this);
        this.rerender = this.rerender.bind(this);
    }

    static propTypes = {
        fileId: PropTypes.string,
        showPreview: PropTypes.bool
    };

    init() {
        client.on('change', this.rerender);
    }

    uninit() {
        client.off('change', this.rerender);
    }

    rerender() {
        this.forceUpdate();
    }

    componentWillUnmount() {
        this.uninit();
    }

    componentDidMount() {
        this.init();
    }

    render() {
        var file = client.db.files.findById(this.props.fileId);

        return (<MessageFilePreviewUi fileId={file._id} fileUrl={file.url} showPreview={this.props.showPreview} />);
    }
}

export default MessageFilePreview;
