var validateFileParentType = (value) => {
    return (
        (value === 'directMessaging' || value === 'room')
    );
};

module.exports = validateFileParentType;
