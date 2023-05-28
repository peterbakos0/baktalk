import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SendMessagePickEmojiUi from '../UiComponents/SendMessagePickEmojiUi/SendMessagePickEmojiUi';

class SendMessagePickEmoji extends Component {
    static propTypes = {
        onEmojiSelect: PropTypes.func
    };

    render() {
        return (<SendMessagePickEmojiUi onEmojiSelect={this.props.onEmojiSelect} />);
    }
}

export default SendMessagePickEmoji;
