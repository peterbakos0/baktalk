import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';
import style from './SendMessageTextBoxUi.module.css';

class SendMessageTextBoxUi extends Component {
    constructor(props) {
        super(props);

        this.textBoxRef = createRef();

        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    static propTypes = {
        messageText: PropTypes.string,
        onChange: PropTypes.func,
        onSubmit: PropTypes.func
    };

    onChange(event) {
        this.props.onChange(event.target.value);
    }

    onKeyDown(event) {
        if((event.keyCode === 13) && !(event.shiftKey)) {
            event.preventDefault();
            this.props.onSubmit();
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props !== prevProps) { this.textBoxRef.current.focus(); }
    }

    render() {
        return (
            <div className={style.wrap}>
                <TextareaAutosize
                    className={style.textBox}
                    ref={this.textBoxRef}
                    value={this.props.messageText}
                    placeholder='Message'
                    autoFocus={true}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                />
            </div>
        );
    }
}

export default SendMessageTextBoxUi;
