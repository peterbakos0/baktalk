import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './EmojiPickerCategoryBarUi.module.css';
import emojiCategories from '../../../constants/emoji-categories';

class EmojiPickerCategoryBarUi extends Component {
    constructor(props) {
        super(props);

        this.onCategoryClick = this.onCategoryClick.bind(this);
    }

    static propTypes = {
        category: PropTypes.string,
        onSelect: PropTypes.func
    };

    onCategoryClick(event) {
        this.props.onSelect(event.target.id);
    }

    render() {
        var categoryElements = [];
        for(var i = 0; i < emojiCategories.length; i++) {
            var emojiCategory = emojiCategories[i];

            categoryElements.push(
                <img
                    className={style.category}
                    id={emojiCategory.name}
                    src={((emojiCategory.name === this.props.category) ? emojiCategory.selectedIcon : emojiCategory.unselectedIcon)}
                    onClick={this.onCategoryClick}
                    key={emojiCategory.name}
                />
            );
        }

        return (<div className={style.wrap}>{categoryElements}</div>);
    }
}

export default EmojiPickerCategoryBarUi;
