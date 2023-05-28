import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessageEditedUi.module.css';

class MessageEditedUi extends Component {
    static propTypes = {
        editDateTimeString: PropTypes.string
    };

    render() {
        var editDateTimeString = this.props.editDateTimeString;
        if(!editDateTimeString) { return null; }

        return (
            <div className={style.wrap}>
                <label className={style.text} title={editDateTimeString}>(edited)</label>
            </div>
        );
    }
}

export default MessageEditedUi;
