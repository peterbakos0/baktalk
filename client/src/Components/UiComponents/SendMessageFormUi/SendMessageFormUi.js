import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './SendMessageFormUi.module.css';
import paperPlaneSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/paper-plane-solid-light-icon.png';
import SendMessagePickEmoji from '../../WholeComponents/SendMessagePickEmoji';
import SendMessageAttachFile from '../../WholeComponents/SendMessageAttachFile';
import SendMessageTextBox from '../../WholeComponents/SendMessageTextBox';

class SendMessageFormUi extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    static propTypes = {
        messageText: PropTypes.string,
        filenames: (PropTypes.arrayOf(PropTypes.string)),
        mode: PropTypes.string,
        onMessageTextChange: PropTypes.func,
        onEmojiSelect: PropTypes.func,
        onFileAdd: PropTypes.func,
        onFileRemove: PropTypes.func,
        onSubmit: PropTypes.func
    };

    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit();
    }

    render() {
        return (
            <div className={style.wrap}>
                <form className={style.form} autoComplete='off' spellCheck={false} onSubmit={this.onSubmit}>
                    <SendMessagePickEmoji onEmojiSelect={this.props.onEmojiSelect} />
                    <SendMessageAttachFile
                        filenames={this.props.filenames}
                        mode={this.props.mode}
                        onFileAdd={this.props.onFileAdd}
                        onFileRemove={this.props.onFileRemove}
                    />
                    <SendMessageTextBox messageText={this.props.messageText} onChange={this.props.onMessageTextChange} onSubmit={this.props.onSubmit} />
                    <button className={style.submit} type='submit'>
                        <img src={paperPlaneSolidLightIcon} />
                    </button>
                </form>
            </div>
        );
    }
}

export default SendMessageFormUi;
