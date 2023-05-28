import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessagingTopBarUi.module.css';
import MessagingTopBarInfo from '../../WholeComponents/MessagingTopBarInfo';
import MessagingTopBarMenus from '../../WholeComponents/MessagingTopBarMenus';

class MessagingTopBarUi extends Component {
    static propTypes = {
        messageParentType: PropTypes.string,
        messageParentId: PropTypes.string,
        mode: PropTypes.string,
        extraFilter: PropTypes.object,
        onMessagesFilter: PropTypes.func,
        onModeReset: PropTypes.func
    };

    render() {
        return (
            <div className={style.wrap}>
                <MessagingTopBarInfo messageParentType={this.props.messageParentType} messageParentId={this.props.messageParentId} />
                <MessagingTopBarMenus
                    mode={this.props.mode}
                    extraFilter={this.props.extraFilter}
                    onMessagesFilter={this.props.onMessagesFilter}
                    onModeReset={this.props.onModeReset}
                />
            </div>
        );
    }
}

export default MessagingTopBarUi;
