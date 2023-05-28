import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import getEmojiByPropUtil from '../../utils/get-emoji-by-prop-util';
import getFilenamesUtil from '../../utils/get-filenames-util';
import SendMessageFormUi from '../UiComponents/SendMessageFormUi/SendMessageFormUi';

class SendMessageForm extends Component {
    constructor(props) {
        super(props);

        this.handleError = this.handleError.bind(this);
        this.updateMessageText = this.updateMessageText.bind(this);
        this.addEmoji = this.addEmoji.bind(this);
        this.addFile = this.addFile.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.submit = this.submit.bind(this);
        this.afterRender = this.afterRender.bind(this);

        this.initialState = {
            messageText: '',
            files: []
        };

        this.state = this.initialState;
    }

    static propTypes = {
        messageParentType: PropTypes.string,
        messageParentId: PropTypes.string,
        mode: PropTypes.string,
        reMessageId: PropTypes.string,
        editMessageId: PropTypes.string,
        onModeReset: PropTypes.func
    };

    handleError() {
        console.error(new Error());

        this.setState(this.initialState);
        this.props.onModeReset();
    }

    updateMessageText(value) {
        this.setState({
            messageText: value
        });
    }

    addEmoji(emojiUnicode) {
        var emoji = getEmojiByPropUtil('unicode', emojiUnicode);

        this.setState({
            messageText: (this.state.messageText + ':' + emoji.name + ': ')
        });
    }

    addFile(file) {
        this.setState({
            files: (this.state.files.concat(file))
        });
    }

    removeFile(fileIndex) {
        var files = this.state.files;

        files.splice(fileIndex, 1);

        this.setState({
            files: files
        });
    }

    async submit() {
        var messageParentType = this.props.messageParentType;
        var messageParentId = this.props.messageParentId;
        var mode = this.props.mode;
        var reMessageId = this.props.reMessageId;
        var editMessageId = this.props.editMessageId;

        var messageText = this.state.messageText;
        var files = this.state.files;

        var success;

        if(mode === 'send') { success = await client.utils.sendMessage(messageText, files, null, messageParentType, messageParentId); }
        else if(mode === 'reply') { success = await client.utils.sendMessage(messageText, files, reMessageId, messageParentType, messageParentId); }
        else if(mode === 'edit') { success = await client.operations.updateMessage(editMessageId, messageText, undefined); }

        if(!success) {
            this.handleError();
            return;
        }

        this.setState(this.initialState);
        this.props.onModeReset();
    }

    afterRender(prevProps = {}) {
        if(this.props.mode !== prevProps.mode) {
            this.setState(this.initialState);

            if(this.props.mode === 'edit') {
                var editMessage = client.db.messages.findById(this.props.editMessageId);

                this.setState({
                    messageText: editMessage.text
                });
            }
        }
    }

    componentDidUpdate(prevProps) {
        this.afterRender(prevProps);
    }

    componentDidMount() {
        this.afterRender();
    }

    render() {
        var filenames = getFilenamesUtil(this.state.files);

        return (
            <SendMessageFormUi
                messageText={this.state.messageText}
                filenames={filenames}
                mode={this.props.mode}
                onMessageTextChange={this.updateMessageText}
                onEmojiSelect={this.addEmoji}
                onFileAdd={this.addFile}
                onFileRemove={this.removeFile}
                onSubmit={this.submit}
            />
        );
    }
}

export default SendMessageForm;
