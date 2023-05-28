import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmojiPickerUi from '../UiComponents/EmojiPickerUi/EmojiPickerUi';

class EmojiPicker extends Component {
    static propTypes = {
        event: PropTypes.object,
        onSelect: PropTypes.func,
        onClose: PropTypes.func
    };

    render() {
        return (<EmojiPickerUi event={this.props.event} onSelect={this.props.onSelect} onClose={this.props.onClose} />);
    }
}

export default EmojiPicker;
