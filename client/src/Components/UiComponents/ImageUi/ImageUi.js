import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './ImageUi.module.css';

class ImageUi extends Component {
    static propTypes = {
        fileUrl: PropTypes.string,
        defaultImage: PropTypes.string
    };

    render() {
        return (
            <div className={style.wrap}>
                <img className={style.image} src={(this.props.fileUrl || this.props.defaultImage)} />
            </div>
        );
    }
}

export default ImageUi;
