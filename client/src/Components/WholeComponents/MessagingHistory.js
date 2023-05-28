import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import getDateStringUtil from '../../utils/get-date-string-util';
import MessagingHistoryUi from '../UiComponents/MessagingHistoryUi/MessagingHistoryUi';

class MessagingHistory extends Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.uninit = this.uninit.bind(this);
        this.handleError = this.handleError.bind(this);
        this.getFeed = this.getFeed.bind(this);
        this.checkAndLoadMore = this.checkAndLoadMore.bind(this);
        this.rerender = this.rerender.bind(this);

        this.state = {
            loading: false
        };
    }

    static propTypes = {
        messageParentType: PropTypes.string,
        messageParentId: PropTypes.string,
        mode: PropTypes.string,
        extraFilter: PropTypes.object,
        onMessageReply: PropTypes.func,
        onMessageEdit: PropTypes.func
    };

    init() {
        client.on('change', this.rerender);
    }

    uninit() {
        client.off('change', this.rerender);
    }

    handleError() {
        console.error(new Error());
    }

    getFeed() {
        var filter = {
            parentType: this.props.messageParentType,
            parentId: this.props.messageParentId
        };

        if(this.props.mode === 'filter') { filter = Object.assign({}, filter, this.props.extraFilter); }

        var feed = client.dbManager.getFeedByFilter(filter);

        return feed;
    }

    async checkAndLoadMore() {
        var feed = this.getFeed();

        if(feed.hasAllMessages) { return; }
        if(this.state.loading) { return; }

        this.setState({
            loading: true
        });

        var success = await feed.loadMore();
        if(!success) {
            this.handleError();
            return;
        }

        this.setState({
            loading: false
        });
    }

    rerender() {
        this.forceUpdate();
    }

    componentWillUnmount() {
        this.uninit();
    }

    componentDidMount() {
        this.init();
    }

    render() {
        var feed = this.getFeed();

        var messageIds = feed.messageIds;

        var messages = [];

        for(var i = 0; i < messageIds.length; i++) {
            var messageId = messageIds[i];

            var message = client.db.messages.findById(messageId);

            var messageHasFile = Boolean(message.fileIds.length);
            var messageIsReply = Boolean(message.reMessageId);

            var messageDateObject = new Date(message.date);

            var messageTime = messageDateObject.getTime();
            var messageDateString = getDateStringUtil(messageDateObject);

            messages.push({
                messageId: message._id,
                hasFile: messageHasFile,
                authorId: message.authorId,
                isReply: messageIsReply,
                time: messageTime,
                dateString: messageDateString
            });
        }

        return (
            <MessagingHistoryUi
                messages={messages}
                mode={this.props.mode}
                loading={this.state.loading}
                onScrollToTop={this.checkAndLoadMore}
                onMessageReply={this.props.onMessageReply}
                onMessageEdit={this.props.onMessageEdit}
            />
        );
    }
}

export default MessagingHistory;
