var path = require('path');
var express = require('express');
var config = require('./constants/config');

var client = express();

client.use(express.static(path.join(__dirname, 'build')));
client.use((req, res) => { res.sendFile(path.join(__dirname, 'build', 'index.html')); });

var main = async () => {
    await client.listen(config.port);
    console.log(`Client server is listening on port ${config.port}...`);
};

main();
