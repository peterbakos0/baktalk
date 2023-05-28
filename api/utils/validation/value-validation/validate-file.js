var validateFile = (value) => {
    return (
        (value.size <= 16000000)
    );
};

module.exports = validateFile;
