var validateMessageText = (value, valueCanBeUndefined) => {
    return (
        (
            (valueCanBeUndefined && value === undefined)
        ) ||
        (
            (typeof value === 'string') &&
            (value.length <= 32768)
        )
    );
};

module.exports = validateMessageText;
