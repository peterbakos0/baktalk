import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilePickerUi from '../UiComponents/FilePickerUi/FilePickerUi';

class FilePicker extends Component {
    static propTypes = {
        filenames: PropTypes.arrayOf(PropTypes.string),
        event: PropTypes.object,
        onAdd: PropTypes.func,
        onRemove: PropTypes.func,
        onClose: PropTypes.func
    };

    render() {
        return (
            <FilePickerUi
                filenames={this.props.filenames}
                event={this.props.event}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
                onClose={this.props.onClose}
            />
        );
    }
}

export default FilePicker;
