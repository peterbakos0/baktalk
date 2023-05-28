import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import style from './MainUi.module.css';
import getLoginPath from '../../../utils/path/get-login-path';
import getHomePath from '../../../utils/path/get-home-path';
import getFriendsPath from '../../../utils/path/get-friends-path';
import getRoomsPath from '../../../utils/path/get-rooms-path';
import getSettingsPath from '../../../utils/path/get-settings-path';
import getMainPath from '../../../utils/path/get-main-path';
import LogoLoader from '../../WholeComponents/LogoLoader';
import HomePage from '../../WholeComponents/HomePage';
import FriendsPage from '../../WholeComponents/FriendsPage';
import RoomsPage from '../../WholeComponents/RoomsPage';
import SettingsPage from '../../WholeComponents/SettingsPage';
import NavBar from '../../WholeComponents/NavBar';

class MainUi extends Component {
    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
    }

    static propTypes = {
        loading: PropTypes.bool,
        credentialsExists: PropTypes.bool,
        history: PropTypes.object,
        afterInit: PropTypes.func
    };

    init() {
        if(!(this.props.credentialsExists)) {
            var loginPath = getLoginPath();

            this.props.history.push(loginPath);
            return;
        }

        this.props.afterInit();
    }

    componentDidMount() {
        this.init();
    }

    render() {
        var homePath = getHomePath();
        var friendsPath = getFriendsPath();
        var roomsPath = getRoomsPath();
        var settingsPath = getSettingsPath();
        var mainPath = getMainPath();

        return (
            <div className={style.wrap}>
                {(
                    this.props.loading ?
                    <LogoLoader /> :
                    <div className={style.container}>
                        <div className={style.pageContainer}>
                            <Route path={homePath} component={(() => (<HomePage />))} />
                            <Route path={friendsPath} component={(() => (<FriendsPage />))} />
                            <Route path={roomsPath} component={(() => (<RoomsPage />))} />
                            <Route path={settingsPath} component={(() => (<SettingsPage />))} />
                            <Route path={mainPath} exact={true} component={(() => (<Redirect to={homePath} />))} />
                        </div>
                        <NavBar />
                    </div>
                )}
            </div>
        );
    }
}

MainUi = withRouter(MainUi);

export default MainUi;
