var User = require('../../DataModels/User');

var verifyRegisterRequest = async (emailAddress, username) => {
    var emailAddressInUse = await User.exists({
        emailAddress: emailAddress
    });
    if(emailAddressInUse) { return false; }

    var usernameInUse = await User.exists({
        username: username
    });
    if(usernameInUse) { return false; }

    return true;
};

module.exports = verifyRegisterRequest;
