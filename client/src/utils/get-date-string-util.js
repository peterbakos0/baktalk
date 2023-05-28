var getDateStringUtil = (dateObject) => {
    var result;

    var year = dateObject.getFullYear();

    var month = dateObject.toLocaleString('en-US', {
        month: 'long'
    });

    var day = dateObject.getDate();

    result = (month + ' ' + day + ' ' + year);

    return result;
};

export default getDateStringUtil;
