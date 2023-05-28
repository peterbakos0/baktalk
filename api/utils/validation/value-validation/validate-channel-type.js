var validateChannelType = (value) => {
    return (
        (value === 'message' || value === 'live')
    );
};

module.exports = validateChannelType;
