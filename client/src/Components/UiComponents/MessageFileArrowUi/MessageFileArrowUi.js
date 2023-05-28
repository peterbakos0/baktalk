import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessageFileArrowUi.module.css';
import chevronDownSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/chevron-down-solid-light-icon.png';
import chevronRightSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/chevron-right-solid-light-icon.png';

class MessageFileArrowUi extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    static propTypes = {
        hasPreview: PropTypes.bool,
        showPreview: PropTypes.bool,
        onChange: PropTypes.func
    };

    onClick() {
        this.props.onChange(!(this.props.showPreview));
    }

    render() {
        var hasPreview = this.props.hasPreview;
        if(!hasPreview) { return null; }

        return (
            <div className={style.wrap} onClick={this.onClick}>
                <img className={style.icon} src={(this.props.showPreview ? chevronDownSolidLightIcon : chevronRightSolidLightIcon)} />
            </div>
        );
    }
}

export default MessageFileArrowUi;
