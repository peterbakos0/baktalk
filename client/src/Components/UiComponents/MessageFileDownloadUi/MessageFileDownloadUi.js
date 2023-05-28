import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import style from './MessageFileDownloadUi.module.css';
import arrowAltDownSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/arrow-alt-down-solid-light-icon.png';

class MessageFileDownloadUi extends Component {
    constructor(props) {
        super(props);

        this.linkRef = createRef();

        this.onClick = this.onClick.bind(this);
    }

    static propTypes = {
        filename: PropTypes.string,
        fileUrl: PropTypes.string,
        shallDownload: PropTypes.bool,
        onClick: PropTypes.func
    };

    onClick() {
        this.props.onClick();
    }

    componentDidUpdate() {
        if(this.props.shallDownload) { this.linkRef.current.click(); }
    }

    render() {
        return (
            <div className={style.wrap}>
                <a className={style.link} ref={this.linkRef} href={this.props.fileUrl} download={this.props.filename} onClick={this.props.onClick}>
                    <img className={style.icon} src={arrowAltDownSolidLightIcon} />
                </a>
            </div>
        );
    }
}

export default MessageFileDownloadUi;
