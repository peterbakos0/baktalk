import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmojiPickerCategoryBarUi from '../UiComponents/EmojiPickerCategoryBarUi/EmojiPickerCategoryBarUi';

class EmojiPickerCategoryBar extends Component {
    static propTypes = {
        category: PropTypes.string,
        onSelect: PropTypes.func
    };

    render() {
        return (<EmojiPickerCategoryBarUi category={this.props.category} onSelect={this.props.onSelect} />);
    }
}

export default EmojiPickerCategoryBar;
