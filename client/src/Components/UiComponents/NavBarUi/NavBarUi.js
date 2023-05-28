import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './NavBarUi.module.css';
import navBarMenus from '../../../constants/nav-bar-menus';

class NavBarUi extends Component {
    render() {
        var topMenuElements = [];
        var bottomMenuElements = [];

        for(var i = 0; i < navBarMenus.length; i++) {
            var navBarMenu = navBarMenus[i];

            var menuIsSelected = window.location.pathname.startsWith(navBarMenu.path);

            var menuElement = (
                <Link className={style.menuLink} to={navBarMenu.path} key={i}>
                    <img className={style.menu} src={(menuIsSelected ? navBarMenu.selectedIcon : navBarMenu.unselectedIcon)} />
                </Link>
            );

            if(navBarMenu.position === 'top') { topMenuElements.push(menuElement); }
            else if(navBarMenu.position === 'bottom') { bottomMenuElements.push(menuElement); }
        }

        return (
            <div className={style.wrap}>
                <div className={style.top}>{topMenuElements}</div>
                <div className={style.bottom}>{bottomMenuElements}</div>
            </div>
        );
    }
}

export default NavBarUi;
