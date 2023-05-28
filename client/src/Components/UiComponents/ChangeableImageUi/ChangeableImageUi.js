import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import style from './ChangeableImageUi.module.css';
import getChooseFileAcceptUtil from '../../../utils/get-choose-file-accept-util';

class ChangeableImageUi extends Component {
    constructor(props) {
        super(props);

        this.chooseFileRef = createRef();

        this.onClick = this.onClick.bind(this);
        this.onChooseFileChange = this.onChooseFileChange.bind(this);
    }

    static propTypes = {
        fileUrl: PropTypes.string,
        hoverText: PropTypes.string,
        onChange: PropTypes.func,
        children: PropTypes.node
    };

    onClick() {
        this.chooseFileRef.current.click();
    }

    onChooseFileChange(event) {
        var file = event.target.files[0];
        if(!file) { return; }

        this.props.onChange(file);
    }

    render() {
        var chooseFileAccept = getChooseFileAcceptUtil();

        return (
            <div className={style.wrap} onClick={this.onClick}>
                {(Boolean(this.props.fileUrl) ? <img className={style.image} src={this.props.fileUrl} /> : this.props.children)}
                <div className={style.hover}>
                    <label className={style.hoverText}>{this.props.hoverText}</label>
                </div>
                <input className={style.chooseFile} ref={this.chooseFileRef} type='file' accept={chooseFileAccept} onChange={this.onChooseFileChange} />
            </div>
        );
    }
}

export default ChangeableImageUi;
