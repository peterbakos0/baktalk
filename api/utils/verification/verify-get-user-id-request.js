var User = require('../../DataModels/User');

var verifyGetUserIdRequest = async (username) => {
    var usernameExists = await User.exists({
        username: username
    });
    if(!usernameExists) { return false; }

    return true;
};

module.exports = verifyGetUserIdRequest;
