import { isEqual } from 'lodash';
import subtractArraysUtil from '../utils/subtract-arrays-util';
import generateChunksUtil from '../utils/generate-chunks-util';
import Feed from './Feed';

class DbManager {
    constructor(client) {
        this.client = client;

        this.updateUserData = this.updateUserData.bind(this);
        this.updateMessages = this.updateMessages.bind(this);
        this.updateReactions = this.updateReactions.bind(this);
        this.loadMessages = this.loadMessages.bind(this);
        this.loadReactions = this.loadReactions.bind(this);
        this.loadFiles = this.loadFiles.bind(this);
        this.loadFilesCompletely = this.loadFilesCompletely.bind(this);
        this.getFeedByFilter = this.getFeedByFilter.bind(this);

        this.feeds = [];
    }

    async updateUserData() {
        var userData = await this.client.operations.getUserData();
        if(!userData) { return false; }

        this.client.db.setUserData(userData);

        this.client.emit('change');

        return true;
    }

    async updateMessages(messageIds) {
        messageIds = messageIds.slice();

        var messages = await this.loadMessages({
            _id: {
                $in: messageIds
            }
        }, undefined, undefined, false, true);

        for(var i = 0; i < messages.length; i++) {
            var message = messages[i];
            messageIds.splice(messageIds.indexOf(message._id), 1);
        }

        this.client.db.messages.removeManyByIds(messageIds);

        var feeds = this.feeds;

        for(var i = 0; i < feeds.length; i++) {
            var feed = feeds[i];
            feed.updateMessageIds(messages, messageIds);
        }

        this.client.emit('change');

        return true;
    }

    async updateReactions(reactionIds) {
        reactionIds = reactionIds.slice();

        var reactions = await this.loadReactions({
            _id: {
                $in: reactionIds
            }
        });

        for(var i = 0; i < reactions.length; i++) {
            var reaction = reactions[i];
            reactionIds.splice(reactionIds.indexOf(reaction._id), 1);
        }

        this.client.db.reactions.removeManyByIds(reactionIds);

        this.client.emit('change');

        return true;
    }

    async loadMessages(messageFilter, skip, limit, loadReactions = true, loadReMessages = true) {
        var currentSkip = (skip || 0);
        var currentLimit = (limit || 16);

        var messages = [];
        var messageIds = [];
        var messageFileIds = [];
        var reMessageIds = [];

        while(true) {
            var messageChunk = await this.client.operations.getMessages(messageFilter, currentSkip, currentLimit);
            if(!messageChunk) { return null; }

            for(var i = 0; i < messageChunk.length; i++) {
                var message = messageChunk[i];

                messages.push(message);
                messageIds.push(message._id);
                messageFileIds = messageFileIds.concat(message.fileIds);

                if(message.reMessageId) { reMessageIds.push(message.reMessageId); }
            }

            if(messageChunk.length < currentLimit) { break; }
            if(limit) { currentLimit -= messageChunk.length; }
            if(currentLimit <= 0) { break; }

            currentSkip += messageChunk.length;
        }

        if(messages.length <= 0) { return []; }

        var existingMessages = this.client.db.messages.find({});

        var existingMessageIds = [];
        for(var i = 0; i < existingMessages.length; i++) { existingMessageIds.push(existingMessages[i]._id); }

        messageFileIds = Array.from(new Set(messageFileIds));
        reMessageIds = Array.from(new Set(reMessageIds));

        reMessageIds = subtractArraysUtil([reMessageIds, messageIds]);
        reMessageIds = subtractArraysUtil([reMessageIds, existingMessageIds]);

        var files = await this.loadFiles(messageFileIds);
        if(!files) { return null; }

        if(loadReactions) {
            var reactions = this.loadReactions({
                messageId: {
                    $in: messageIds
                }
            });
            if(!reactions) { return null; }
        }

        if((reMessageIds.length > 0) && loadReMessages) {
            var reMessages = await this.loadMessages({
                _id: {
                    $in: reMessageIds
                }
            }, undefined, undefined, false, false);
            if(!reMessages) { return null; }
        }

        this.client.db.messages.saveMany(messages);

        this.client.emit('change');

        return messages;
    }

    async loadReactions(reactionFilter, skip, limit) {
        var currentSkip = (skip || 0);
        var currentLimit = (limit || 16);

        var reactions = [];

        while(true) {
            var reactionChunk = await this.client.operations.getReactions(reactionFilter, currentSkip, currentLimit);
            if(!reactionChunk) { return null; }

            reactions = reactions.concat(reactionChunk);

            if(reactionChunk.length < currentLimit) { break; }
            if(limit) { currentLimit -= messageChunk.length; }
            if(currentLimit <= 0) { break; }

            currentSkip += reactionChunk.length;
        }

        this.client.db.reactions.saveMany(reactions);

        this.client.emit('change');

        return reactions;
    }

    async loadFiles(fileIds) {
        var fileIds = fileIds.filter((fileId) => {
            var fileIdExists = this.client.db.files.exists({
                _id: fileId
            });
            if(fileIdExists) { return false; }

            return true;
        });

        if(fileIds.length <= 0) { return []; }

        var fileIdChunks = generateChunksUtil(fileIds, 16);

        var files = [];

        for(var i = 0; i < fileIdChunks.length; i++) {
            var fileIdChunk = fileIdChunks[i];

            var fileChunk = await this.client.operations.getFiles(fileIdChunk);
            if(!fileChunk) { return null; }

            files = files.concat(fileChunk);
        }

        this.client.db.files.saveMany(files);

        this.client.emit('change');

        return files;
    }

    async loadFilesCompletely(fileIds) {
        var files = await this.loadFiles(fileIds);
        if(!files) { return false; }

        var fileIds = fileIds.filter((fileId) => {
            var fileIsCompletelyLoaded = this.client.db.files.findOne({
                _id: fileId,
                blob: {
                    $ne: undefined
                }
            });
            if(fileIsCompletelyLoaded) { return false; }

            return true;
        });

        var files = [];

        for(var i = 0; i < fileIds.length; i++) {
            var fileId = fileIds[i];

            var blob = await this.client.operations.downloadFile(fileId);
            if(!blob) { return false; }

            var file = this.client.db.files.findById(fileId);

            file.blob = new Blob([blob], {
                type: file.contentType
            });

            file.url = URL.createObjectURL(file.blob);

            files.push(files);
        }

        this.client.db.files.saveMany(files);

        this.client.emit('change');

        return true;
    }

    getFeedByFilter(filter) {
        var feeds = this.feeds;

        for(var i = 0; i < feeds.length; i++) {
            var feed = feeds[i];

            var doesFeedMatch = isEqual(feed.filter, filter);
            if(doesFeedMatch) { return feed; }
        }

        var feed = new Feed(filter, this.client);
        this.feeds.push(feed);

        return feed;
    }
}

export default DbManager;
