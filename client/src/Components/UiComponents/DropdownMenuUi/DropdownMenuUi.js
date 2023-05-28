import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './DropdownMenuUi.module.css';

class DropdownMenuUi extends Component {
    static propTypes = {
        id: PropTypes.string,
        text: PropTypes.string,
        icon: PropTypes.string,
        onClick: PropTypes.func
    };

    render() {
        return (
            <div className={style.wrap} id={this.props.id} onClick={this.props.onClick}>
                <img className={style.icon} src={this.props.icon} />
                <label className={style.text}>{this.props.text}</label>
            </div>
        );
    }
}

export default DropdownMenuUi;
