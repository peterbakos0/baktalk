var crypto = require('crypto');
var User = require('../../DataModels/User');

var verifyLoginRequest = async (userId, passwordHash) => {
    var passwordDoubleHash = crypto
        .createHash('sha256')
        .update(passwordHash)
        .digest('hex');

    var credentialsAreCorrect = await User.exists({
        _id: userId,
        passwordDoubleHash: passwordDoubleHash
    });
    if(!credentialsAreCorrect) { return false; }

    return true;
};

module.exports = verifyLoginRequest;
