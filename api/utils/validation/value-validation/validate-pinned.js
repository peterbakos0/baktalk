var validatePinned = (value) => {
    return (
        (
            (value === undefined)
        ) ||
        (
            (typeof value === 'boolean')
        )
    );
};

module.exports = validatePinned;
