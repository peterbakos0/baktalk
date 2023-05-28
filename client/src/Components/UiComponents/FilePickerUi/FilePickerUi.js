import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import style from './FilePickerUi.module.css';
import plusSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/plus-solid-light-icon.png';
import Dropdown from '../../WholeComponents/Dropdown';
import FilePickerList from '../../WholeComponents/FilePickerList';
import DropdownMenu from '../../WholeComponents/DropdownMenu';

class FilePickerUi extends Component {
    constructor(props) {
        super(props);

        this.chooseFileRef = createRef();

        this.onChooseFileChange = this.onChooseFileChange.bind(this);
        this.onAddFileClick = this.onAddFileClick.bind(this);
    }

    static propTypes = {
        filenames: (PropTypes.arrayOf(PropTypes.string)),
        event: PropTypes.object,
        onAdd: PropTypes.func,
        onRemove: PropTypes.func,
        onClose: PropTypes.func
    };

    onChooseFileChange(event) {
        var file = event.target.files[0];
        if(!file) { return; }

        this.props.onAdd(file);
    }

    onAddFileClick() {
        this.chooseFileRef.current.click();
    }

    render() {
        var event = this.props.event;
        if(!event) { return null; }

        return (
            <div className={style.wrap}>
                <Dropdown event={event} onClose={this.props.onClose}>
                    <FilePickerList filenames={this.props.filenames} onRemove={this.props.onRemove} />
                    <DropdownMenu text='Add File' icon={plusSolidLightIcon} onClick={this.onAddFileClick} />
                </Dropdown>
                <input className={style.chooseFile} ref={this.chooseFileRef} type='file' onChange={this.onChooseFileChange} />
            </div>
        );
    }
}

export default FilePickerUi;
