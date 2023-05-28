var validateLimit = (value) => {
    return (
        (Number.isInteger(value)) &&
        (value >= 0) &&
        (value <= 16)
    );
};

module.exports = validateLimit;
