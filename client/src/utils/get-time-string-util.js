var getTimeStringUtil = (dateObject) => {
    var result = dateObject.toLocaleTimeString('en-US', {
        minute: '2-digit',
        hour: '2-digit'
    });

    return result;
};

export default getTimeStringUtil;
