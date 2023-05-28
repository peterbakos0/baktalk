import getDateStringUtil from './get-date-string-util';
import getTimeStringUtil from './get-time-string-util';

var getDateTimeStringUtil = (dateObject) => {
    var result;

    var dateString = getDateStringUtil(dateObject);
    var timeString = getTimeStringUtil(dateObject);

    result = (dateString + ' ' + timeString);

    return result;
};

export default getDateTimeStringUtil;
