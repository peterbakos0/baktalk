import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './SendMessageAttachFileUi.module.css';
import paperclipSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/paperclip-solid-light-icon.png';
import FilePicker from '../../WholeComponents/FilePicker';

class SendMessageAttachFileUi extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onFileAdd = this.onFileAdd.bind(this);
        this.onFileRemove = this.onFileRemove.bind(this);
        this.onFilePickerClose = this.onFilePickerClose.bind(this);

        this.state = {
            event: null
        };
    }

    static propTypes = {
        filenames: (PropTypes.arrayOf(PropTypes.string)),
        mode: PropTypes.string,
        onFileAdd: PropTypes.func,
        onFileRemove: PropTypes.func
    };

    onClick(event) {
        this.setState({
            event: event
        });
    }

    onFileAdd(file) {
        this.props.onFileAdd(file);

        this.setState({
            event: null
        });
    }

    onFileRemove(fileIndex) {
        this.props.onFileRemove(fileIndex);

        this.setState({
            event: null
        });
    }

    onFilePickerClose() {
        this.setState({
            event: null
        });
    }

    render() {
        if(this.props.mode === 'edit') { return null; }

        return (
            <div className={style.wrap}>
                <img className={style.icon} src={paperclipSolidLightIcon} onClick={this.onClick} />
                <FilePicker
                    filenames={this.props.filenames}
                    event={this.state.event}
                    onAdd={this.onFileAdd}
                    onRemove={this.onFileRemove}
                    onClose={this.onFilePickerClose}
                />
            </div>
        );
    }
}

export default SendMessageAttachFileUi;
