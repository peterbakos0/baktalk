var validateHash = (value, valueCanBeUndefined) => {
    var regex = /^[0-9a-f]{64}$/;

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

module.exports = validateHash;
