import config from '../constants/config';

var getApiUrlUtil = () => {
    var protocol = (config.apiSecure ? 'https' : 'http');
    var host = config.apiHost;
    var port = config.apiPort;

    var result = (protocol + '://' + host + ':' + port);

    return result;
};

export default getApiUrlUtil;
