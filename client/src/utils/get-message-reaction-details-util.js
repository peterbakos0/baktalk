import client from '../client';
import getEmojiByPropUtil from './get-emoji-by-prop-util';

var getMessageReactionDetailsUtil = (emojiUnicode, messageId) => {
    var reactions = client.db.reactions.find({
        emojiUnicode: emojiUnicode,
        messageId: messageId
    });

    var maxIndex = Math.min(reactions.length, 5);

    var list = [];

    for(var i = 0; i < maxIndex; i++) {
        var reaction = reactions[i];

        var reactionAuthorName = client.utils.getReactionAuthorName(reaction._id);
        reactionAuthorName = (reactionAuthorName || '[deleted]');

        list.push(reactionAuthorName);
    }

    var otherCount = (reactions.length - maxIndex);

    if(otherCount > 0) {
        var otherText = (otherCount + ' ' + ((otherCount === 1) ? 'other' : 'others'));
        list.push(otherText);
    }

    var result = '';

    for(var i = 0; i < list.length; i++) {
        var element = list[i];

        result += element;

        if(i < (list.length - 2)) { result += ', '; }
        else if(i === (list.length - 2)) { result += ' and '; }
    }

    var emoji = getEmojiByPropUtil('unicode', emojiUnicode);

    result += (' reacted with :' + emoji.name + ':');

    return result;
};

export default getMessageReactionDetailsUtil;
