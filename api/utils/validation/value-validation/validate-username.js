var validateUsername = (value, valueCanBeUndefined) => {
    var regex = /^[0-9A-Za-z_-]{4,16}$/;

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

module.exports = validateUsername;
