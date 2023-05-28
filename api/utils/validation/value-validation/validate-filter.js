var validateFilter = (value) => {
    return (
        (value !== null) &&
        (typeof value === 'object')
    );
};

module.exports = validateFilter;
