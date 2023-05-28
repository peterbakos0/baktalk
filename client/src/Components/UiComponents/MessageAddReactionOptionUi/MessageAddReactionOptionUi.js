import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessageAddReactionOptionUi.module.css';
import smileSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/smile-solid-light-icon.png';
import DropdownMenu from '../../WholeComponents/DropdownMenu';
import EmojiPicker from '../../WholeComponents/EmojiPicker';

class MessageAddReactionOptionUi extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onEmojiSelect = this.onEmojiSelect.bind(this);
        this.closeEmojiPicker = this.closeEmojiPicker.bind(this);

        this.state = {
            event: null
        };
    }

    static propTypes = {
        onEmojiSelect: PropTypes.func,
        updateDropdownCanCloseOptions: PropTypes.func,
        onClose: PropTypes.func
    };

    onClick(event) {
        this.setState({
            event: event
        });

        this.props.updateDropdownCanCloseOptions(false);
    }

    onEmojiSelect(emojiUnicode) {
        this.props.onEmojiSelect(emojiUnicode);
        window.requestAnimationFrame(this.closeEmojiPicker);
    }

    closeEmojiPicker() {
        this.setState({
            event: null
        });

        this.props.updateDropdownCanCloseOptions(true);
    }

    render() {
        return (
            <div className={style.wrap}>
                <DropdownMenu text='Add Reaction' icon={smileSolidLightIcon} onClick={this.onClick} />
                <EmojiPicker event={this.state.event} onSelect={this.onEmojiSelect} onClose={this.closeEmojiPicker} />
            </div>
        );
    }
}

export default MessageAddReactionOptionUi;
