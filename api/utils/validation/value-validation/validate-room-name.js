var validateRoomName = (value, valueCanBeUndefined) => {
    var regex = /^[0-9A-Za-z _-]{4,32}$/;

    return (
        (
            (valueCanBeUndefined && value === undefined)
        ) ||
        (
            (typeof value === 'string') &&
            regex.test(value)
        )
    );
};

module.exports = validateRoomName;
