import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmojiPickerGridUi from '../UiComponents/EmojiPickerGridUi/EmojiPickerGridUi';

class EmojiPickerGrid extends Component {
    static propTypes = {
        category: PropTypes.string,
        onSelect: PropTypes.func
    };

    render() {
        return (<EmojiPickerGridUi category={this.props.category} onSelect={this.props.onSelect} />);
    }
}

export default EmojiPickerGrid;
