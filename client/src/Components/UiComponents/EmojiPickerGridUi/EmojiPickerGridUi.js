import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import style from './EmojiPickerGridUi.module.css';
import emojis from '../../../constants/emojis';

class EmojiPickerGridUi extends Component {
    constructor(props) {
        super(props);

        this.wrapRef = createRef();

        this.onEmojiClick = this.onEmojiClick.bind(this);
    }

    static propTypes = {
        category: PropTypes.string,
        onSelect: PropTypes.func
    };

    onEmojiClick(event) {
        this.props.onSelect(event.target.id);
    }

    componentDidUpdate(prevProps) {
        if(this.props.category !== prevProps.category) { this.wrapRef.current.scrollTop = 0; }
    }

    render() {
        var emojiElements = [];
        for(var i = 0; i < emojis.length; i++) {
            var emoji = emojis[i];

            if(emoji.category !== this.props.category) { continue; }

            emojiElements.push(
                <img
                    className={style.emoji}
                    id={emoji.unicode}
                    src={emoji.image}
                    onClick={this.onEmojiClick}
                    key={emoji.unicode}
                />
            );
        }

        return (<div className={style.wrap} ref={this.wrapRef}>{emojiElements}</div>);
    }
}

export default EmojiPickerGridUi;
