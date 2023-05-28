import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './FilePickerListUi.module.css';
import fileSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/file-solid-light-icon.png';
import DropdownMenu from '../../WholeComponents/DropdownMenu';

class FilePickerListUi extends Component {
    constructor(props) {
        super(props);

        this.onFileClick = this.onFileClick.bind(this);
    }

    static propTypes = {
        filenames: (PropTypes.arrayOf(PropTypes.string)),
        onRemove: PropTypes.func
    };

    onFileClick(event) {
        this.props.onRemove(event.target.id);
    }

    render() {
        var filenames = this.props.filenames;

        var fileComponents = [];
        for(var i = 0; i < filenames.length; i++) {
            var filename = filenames[i];
            fileComponents.push(<DropdownMenu id={i} text={filename} icon={fileSolidLightIcon} onClick={this.onFileClick} key={i} />);
        }

        return (<div className={style.wrap}>{fileComponents}</div>);
    }
}

export default FilePickerListUi;
