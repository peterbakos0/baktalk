var validateToken = (value) => {
    return (
        (typeof value === 'string') &&
        (value.length <= 256)
    );
};

module.exports = validateToken;
