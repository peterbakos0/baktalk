var validateMessageParentType = (value, valueCanBeUndefined) => {
    return (
        (
            (valueCanBeUndefined && value === undefined)
        ) ||
        (
            (value === 'directMessaging' || value === 'channel')
        )
    );
};

module.exports = validateMessageParentType;
