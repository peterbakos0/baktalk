import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessagingTopBarMenusUi from '../UiComponents/MessagingTopBarMenusUi/MessagingTopBarMenusUi'

class MessagingTopBarMenus extends Component {
    static propTypes = {
        mode: PropTypes.string,
        extraFilter: PropTypes.object,
        onMessagesFilter: PropTypes.func,
        onModeReset: PropTypes.func
    };

    render() {
        return (
            <MessagingTopBarMenusUi
                mode={this.props.mode}
                extraFilter={this.props.extraFilter}
                onMessagesFilter={this.props.onMessagesFilter}
                onModeReset={this.props.onModeReset}
            />
        );
    }
}

export default MessagingTopBarMenus;
