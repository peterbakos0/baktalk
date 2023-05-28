import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessagingTopBarMenusUi.module.css';
import MessagingTopBarPinnedMenu from '../../WholeComponents/MessagingTopBarPinnedMenu';

class MessagingTopBarMenusUi extends Component {
    static propTypes = {
        mode: PropTypes.string,
        extraFilter: PropTypes.object,
        onMessagesFilter: PropTypes.func,
        onModeReset: PropTypes.func
    };

    render() {
        return (
            <div className={style.wrap}>
                <MessagingTopBarPinnedMenu
                    mode={this.props.mode}
                    extraFilter={this.props.extraFilter}
                    onMessagesFilter={this.props.onMessagesFilter}
                    onModeReset={this.props.onModeReset}
                />
            </div>
        );
    }
}

export default MessagingTopBarMenusUi;
