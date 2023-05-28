import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessageFilePreviewUi.module.css';
import defaultImage from '../../../assets/images/same-images/default-image.png';
import Image from '../../WholeComponents/Image';

class MessageFilePreviewUi extends Component {
    static propTypes = {
        fileId: PropTypes.string,
        fileUrl: PropTypes.string,
        showPreview: PropTypes.bool
    };

    render() {
        var showPreview = this.props.showPreview;
        if(!showPreview) { return null; }

        return (
            <div className={style.wrap}>
                <a className={style.imageLink} href={this.props.fileUrl} target='_blank'>
                    <Image fileId={this.props.fileId} defaultImage={defaultImage} />
                </a>
            </div>
        );
    }
}

export default MessageFilePreviewUi;
