var validateUnicode = (value) => {
    var regex = /^[0-9A-F-]{2,42}$/;

    return (
        (typeof value === 'string') &&
        regex.test(value)
    );
};

module.exports = validateUnicode;
