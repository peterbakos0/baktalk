var httpProxy = require('http-proxy');

var proxyUtil = (port, path, app, server) => {
    var proxyServer = httpProxy.createProxyServer({
        target: {
            host: 'localhost',
            port: port
        }
    });

    app.all((path + '/*'), (req, res) => {
        proxyServer.web(req, res, (error) => { console.log(error); });
    });

    server.on('upgrade', (req, socket, head) => {
        if(req.url.substring(0, path.length) === path) { proxyServer.ws(req, socket, head); }
    });
};

module.exports = proxyUtil;
