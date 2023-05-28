var validateSkip = (value) => {
    return (
        (Number.isInteger(value)) &&
        (value >= 0) &&
        (value <= 4294967296)
    );
};

module.exports = validateSkip;
