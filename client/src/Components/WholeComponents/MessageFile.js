import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageFileUi from '../UiComponents/MessageFileUi/MessageFileUi';

class MessageFile extends Component {
    constructor(props) {
        super(props);

        this.updateShowPreview = this.updateShowPreview.bind(this);

        this.state = {
            showPreview: false
        };
    }

    static propTypes = {
        fileId: PropTypes.string
    };

    updateShowPreview(value) {
        this.setState({
            showPreview: value
        });
    }

    render() {
        return (<MessageFileUi fileId={this.props.fileId} showPreview={this.state.showPreview} onShowPreviewChange={this.updateShowPreview} />);
    }
}

export default MessageFile;
