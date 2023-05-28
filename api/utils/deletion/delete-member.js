var deleteRoom = require('./delete-room');
var Member = require('../../DataModels/Member');

var deleteMember = async (memberId) => {
    var member = await Member.findByIdAndDelete(memberId);

    var nextMember = await Member.findOne({
        roomId: member.roomId
    });

    if(nextMember) {
        var roomHasMemberWithAdminRole = await Member.exists({
            role: 'admin',
            roomId: member.roomId
        });

        if(!roomHasMemberWithAdminRole) {
            await nextMember.updateOne({
                role: 'admin'
            });
        }
    }
    else {
        await deleteRoom(member.roomId);
    }

    return member;
};

module.exports = deleteMember;
