import getMembersPath from './get-members-path';

var getMemberPath = (memberId, roomId) => {
    var memberPath = getMembersPath(roomId);

    var result = (memberPath + '/' + memberId);
    return result;
};

export default getMemberPath;
