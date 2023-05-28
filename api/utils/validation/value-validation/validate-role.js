var validateRole = (value) => {
    return (
        (
            (value === undefined)
        ) ||
        (
            (value === 'member' || value === 'admin')
        )
    );
};

module.exports = validateRole;
