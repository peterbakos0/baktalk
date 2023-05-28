import getHomePath from '../utils/path/get-home-path';
import getFriendsPath from '../utils/path/get-friends-path';
import getRoomsPath from '../utils/path/get-rooms-path';
import getSettingsPath from '../utils/path/get-settings-path';
import lightLogo from '../assets/images/light-images/light-logo.png';
import logo from '../assets/images/same-images/logo.png';
import userFriendsRegularLightIcon from '../assets/images/light-images/light-icons/regular-light-icons/user-friends-regular-light-icon.png';
import userFriendsRegularBlueIcon from '../assets/images/blue-images/blue-icons/regular-blue-icons/user-friends-regular-blue-icon.png';
import usersRegularLightIcon from '../assets/images/light-images/light-icons/regular-light-icons/users-regular-light-icon.png';
import usersRegularBlueIcon from '../assets/images/blue-images/blue-icons/regular-blue-icons/users-regular-blue-icon.png';
import cogRegularLightIcon from '../assets/images/light-images/light-icons/regular-light-icons/cog-regular-light-icon.png';
import cogRegularBlueIcon from '../assets/images/blue-images/blue-icons/regular-blue-icons/cog-regular-blue-icon.png';

var homePath = getHomePath();
var friendsPath = getFriendsPath();
var roomsPath = getRoomsPath();
var settingsPath = getSettingsPath();

var navBarMenus = [
    {
        path: homePath,
        unselectedIcon: lightLogo,
        selectedIcon: logo,
        position: 'top'
    },
    {
        path: friendsPath,
        unselectedIcon: userFriendsRegularLightIcon,
        selectedIcon: userFriendsRegularBlueIcon,
        position: 'top'
    },
    {
        path: roomsPath,
        unselectedIcon: usersRegularLightIcon,
        selectedIcon: usersRegularBlueIcon,
        position: 'top'
    },
    {
        path: settingsPath,
        unselectedIcon: cogRegularLightIcon,
        selectedIcon: cogRegularBlueIcon,
        position: 'bottom'
    }
];

export default navBarMenus;
