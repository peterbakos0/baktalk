var validateChannelName = (value, valueCanBeUndefined) => {
    var regex = /^[0-9A-Za-z _-]{4,16}$/;

    return (
        (
            (valueCanBeUndefined && value === undefined)
        ) ||
        (
            (typeof value === 'string') &&
            regex.test(value)
        )
    );
};

module.exports = validateChannelName;
