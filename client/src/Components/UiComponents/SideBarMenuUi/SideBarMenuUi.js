import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './SideBarMenuUi.module.css';
import onlineIcon from '../../../assets/images/same-images/same-icons/online-icon.png';
import offlineIcon from '../../../assets/images/same-images/same-icons/offline-icon.png';

class SideBarMenuUi extends Component {
    static propTypes = {
        text: PropTypes.string,
        online: PropTypes.bool,
        selected: PropTypes.bool,
        children: PropTypes.node
    };

    render() {
        var statusIcon;

        if(this.props.online === true) { statusIcon = onlineIcon; }
        else if(this.props.online === false) { statusIcon = offlineIcon; }

        return (
            <div className={(style.wrap + ' ' + (this.props.selected ? style.selected : style.unselected))}>
                <div className={style.left}>
                    {this.props.children[0]}
                    {(Boolean(statusIcon) ? <img className={style.status} src={statusIcon} /> : null)}
                    <label className={style.text}>{this.props.text}</label>
                </div>
                <div className={style.right}>{this.props.children[1]}</div>
            </div>
        );
    }
}

export default SideBarMenuUi;
