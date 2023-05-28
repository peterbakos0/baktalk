import Collection from './Collection';
import subtractArraysUtil from '../utils/subtract-arrays-util';

class Feed {
    constructor(filter, client) {
        this.filter = filter;
        this.client = client;

        this.updateMessageIds = this.updateMessageIds.bind(this);
        this.loadMore = this.loadMore.bind(this);

        this.messageIds = [];
        this.hasAllMessages = false;
    }

    updateMessageIds(updatedMessages, deletedMessageIds) {
        var matchingUpdatedMessages = new Collection(...updatedMessages).find(this.filter);
        var notMatchingUpdatedMessages = subtractArraysUtil([updatedMessages, matchingUpdatedMessages]);

        var notMatchingUpdatedMessageIds = [];
        for(var i = 0; i < notMatchingUpdatedMessages.length; i++) { notMatchingUpdatedMessageIds.push(notMatchingUpdatedMessages[i]._id); }

        var messageIdsToDelete = deletedMessageIds.concat(notMatchingUpdatedMessageIds);

        for(var i = 0; i < matchingUpdatedMessages.length; i++) {
            var matchingUpdatedMessage = matchingUpdatedMessages[i];

            var messageIdsIncludes = this.messageIds.includes(matchingUpdatedMessage._id);
            if(!messageIdsIncludes) { this.messageIds.unshift(matchingUpdatedMessage._id); }
        }

        this.messageIds = this.messageIds.filter((messageId) => {
            var shallDeleteMessageId = messageIdsToDelete.includes(messageId);
            return !shallDeleteMessageId;
        });
    }

    async loadMore() {
        if(this.hasAllMessages) { return true; }

        var messages = await this.client.dbManager.loadMessages(this.filter, this.messageIds.length, 16, true, true);
        if(!messages) { return false; }

        for(var i = 0; i < messages.length; i++) {
            var message = messages[i];
            this.messageIds.push(message._id);
        }

        if(messages.length < 16) { this.hasAllMessages = true; }

        this.client.emit('change');

        return true;
    }
}

export default Feed;
