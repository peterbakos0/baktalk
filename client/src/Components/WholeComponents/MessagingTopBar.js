import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessagingTopBarUi from '../UiComponents/MessagingTopBarUi/MessagingTopBarUi';

class MessagingTopBar extends Component {
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
            <MessagingTopBarUi
                messageParentType={this.props.messageParentType}
                messageParentId={this.props.messageParentId}
                mode={this.props.mode}
                extraFilter={this.props.extraFilter}
                onMessagesFilter={this.props.onMessagesFilter}
                onModeReset={this.props.onModeReset}
            />
        );
    }
}

export default MessagingTopBar;
