var validateMemberName = (value) => {
    var regex = /^[0-9A-Za-z _-]{4,16}$/;

    return (
        (
            (value === null) ||
            (value === undefined)
        ) ||
        (
            (typeof value === 'string') &&
            regex.test(value)
        )
    );
};

module.exports = validateMemberName;
