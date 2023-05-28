import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import getDateTimeStringUtil from '../../utils/get-date-time-string-util';
import MessageEditedUi from '../UiComponents/MessageEditedUi/MessageEditedUi';

class MessageEdited extends Component {
    static propTypes = {
        messageId: PropTypes.string
    };

    render() {
        var message = client.db.messages.findById(this.props.messageId);

        var messageEditDateTimeString;

        if(message.editDate) {
            var messageEditDateObject = new Date(message.editDate);
            messageEditDateTimeString = getDateTimeStringUtil(messageEditDateObject);
        }
        else {
            messageEditDateTimeString = null;
        }

        return (<MessageEditedUi editDateTimeString={messageEditDateTimeString} />);
    }
}

export default MessageEdited;
