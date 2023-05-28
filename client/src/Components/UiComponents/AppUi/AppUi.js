import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import style from './AppUi.module.css';
import getMainPath from '../../../utils/path/get-main-path';
import getLoginPath from '../../../utils/path/get-login-path';
import getRegisterPath from '../../../utils/path/get-register-path';
import getRootPath from '../../../utils/path/get-root-path';
import Main from '../../WholeComponents/Main';
import Login from '../../WholeComponents/Login';
import Register from '../../WholeComponents/Register';

class AppUi extends Component {
    render() {
        var mainPath = getMainPath();
        var loginPath = getLoginPath();
        var registerPath = getRegisterPath();
        var rootPath = getRootPath();

        return (
            <div className={style.wrap}>
                <Router>
                    <Route path={mainPath} component={(() => (<Main />))} />
                    <Route path={loginPath} component={(() => (<Login />))} />
                    <Route path={registerPath} component={(() => (<Register />))} />
                    <Route path={rootPath} exact={true} component={(() => (<Redirect to={mainPath} />))} />
                </Router>
            </div>
        );
    }
}

export default AppUi;
