var jwt = require('jsonwebtoken');
var Client = require('../../DataModels/Client');
var Member = require('../../DataModels/Member');

var verifyUpdateMemberRequest = async (memberId, memberName, role, clientToken) => {
    try { var clientTokenData = await jwt.verify(clientToken, process.env.TOKEN_SECRET); }
    catch(error) { return false; }

    var client = await Client.findById(clientTokenData.clientId);
    if(!client) { return false; }

    var member = await Member.findById(memberId);
    if(!member) { return false; }

    if(member.userId.toString() === client.userId.toString()) {
        if(role !== undefined) { return false; }
    }
    else {
        var userHasAdminRoleInRoom = await Member.exists({
            role: 'admin',
            userId: client.userId,
            roomId: member.roomId
        });
        if(!userHasAdminRoleInRoom) { return false; }
    }

    if(memberName !== undefined && memberName !== null) {
        var memberNameInUse = await Member.exists({
            name: memberName,
            roomId: member.roomId
        });
        if(memberNameInUse) { return false; }
    }

    return true;
};

module.exports = verifyUpdateMemberRequest;
