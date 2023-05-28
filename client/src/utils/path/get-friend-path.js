import getFriendsPath from './get-friends-path';

var getFriendPath = (friendId) => {
    var friendsPath = getFriendsPath();

    var result = (friendsPath + '/' + friendId);
    return result;
};

export default getFriendPath;
