import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './EmojiPickerUi.module.css';
import Dropdown from '../../WholeComponents/Dropdown';
import EmojiPickerCategoryBar from '../../WholeComponents/EmojiPickerCategoryBar';
import EmojiPickerGrid from '../../WholeComponents/EmojiPickerGrid';

class EmojiPickerUi extends Component {
    constructor(props) {
        super(props);

        this.updateCategory = this.updateCategory.bind(this);

        this.initialState = {
            category: 'people'
        };

        this.state = this.initialState;
    }

    static propTypes = {
        event: PropTypes.object,
        onSelect: PropTypes.func,
        onClose: PropTypes.func
    };

    updateCategory(value) {
        this.setState({
            category: value
        });
    }

    componentDidUpdate(prevProps) {
        if(this.props.event !== prevProps.event) { this.setState(this.initialState); }
    }

    render() {
        var event = this.props.event;
        if(!event) { return null; }

        return (
            <div className={style.wrap}>
                <Dropdown event={event} hasPadding={false} onClose={this.props.onClose}>
                    <div className={style.container}>
                        <EmojiPickerCategoryBar category={this.state.category} onSelect={this.updateCategory} />
                        <EmojiPickerGrid category={this.state.category} onSelect={this.props.onSelect} />
                    </div>
                </Dropdown>
            </div>
        );
    }
}

export default EmojiPickerUi;
