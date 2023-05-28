import emojis from '../constants/emojis';

var getEmojiByPropUtil = (key, value) => {
    var result = ((emojis.filter((emoji) => (emoji[key] === value))[0]) || null);
    return result;
};

export default getEmojiByPropUtil;
