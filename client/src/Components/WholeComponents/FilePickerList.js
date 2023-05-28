import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilePickerListUi from '../UiComponents/FilePickerListUi/FilePickerListUi';

class FilePickerList extends Component {
    static propTypes = {
        filenames: PropTypes.arrayOf(PropTypes.string),
        onRemove: PropTypes.func
    };

    render() {
        return (<FilePickerListUi filenames={this.props.filenames} onRemove={this.props.onRemove} />);
    }
}

export default FilePickerList;
