import { isEqual } from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessagingTopBarPinnedMenuUi from '../UiComponents/MessagingTopBarPinnedMenuUi/MessagingTopBarPinnedMenuUi';

class MessagingTopBarPinnedMenu extends Component {
    constructor(props) {
        super(props);

        this.toggleMessagesArePinnedFiltered = this.toggleMessagesArePinnedFiltered.bind(this);
    }

    static propTypes = {
        mode: PropTypes.string,
        extraFilter: PropTypes.object,
        onMessagesFilter: PropTypes.func,
        onModeReset: PropTypes.func
    };

    toggleMessagesArePinnedFiltered() {
        var messagesArePinnedFiltered = ((this.props.mode === 'filter') && isEqual(this.props.extraFilter, {
            pinned: true
        }));

        if(messagesArePinnedFiltered) {
            this.props.onModeReset();
        }
        else {
            this.props.onMessagesFilter({
                pinned: true
            });
        }
    }

    render() {
        var messagesArePinnedFiltered = ((this.props.mode === 'filter') && isEqual(this.props.extraFilter, {
            pinned: true
        }));

        return (<MessagingTopBarPinnedMenuUi messagesArePinnedFiltered={messagesArePinnedFiltered} onClick={this.toggleMessagesArePinnedFiltered} />);
    }
}

export default MessagingTopBarPinnedMenu;
