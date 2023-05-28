var validateId = (value, valueCanBeNull, valueCanBeUndefined) => {
    var regex = /^[0-9a-f]{24}$/;

    return (
        (
            (valueCanBeNull && value === null) ||
            (valueCanBeUndefined && value === undefined)
        ) ||
        (
            (typeof value === 'string') &&
            regex.test(value)
        )
    );
};

module.exports = validateId;
