import shortid from 'shortid';
import getEmojiByPropUtil from './get-emoji-by-prop-util';

var emojifyStringUtil = (text, emojiExtraProps) => {
    var result = [];

    var textChunks = text.split(':');

    for(var i = 0; i < textChunks.length; i++) {
        var textChunk = textChunks[i];

        var emoji = getEmojiByPropUtil('name', textChunk);

        if(emoji && (i > 0) && (i < (textChunks.length - 1))) {
            result[result.length - 1] = result[result.length - 1].slice(0, -1);
            result.push(<img {...emojiExtraProps} src={emoji.image} key={shortid.generate()} />);

            continue;
        }

        var plusText = (textChunk + ((i < (textChunks.length - 1)) ? ':' : ''));

        if(typeof result[result.length - 1] === 'string') { result[result.length - 1] += plusText; }
        else { result.push(plusText); }
    }

    return result;
};

export default emojifyStringUtil;
