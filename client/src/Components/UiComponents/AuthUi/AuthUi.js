import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import style from './AuthUi.module.css';
import getMainPath from '../../../utils/path/get-main-path';
import lightLogoFull from '../../../assets/images/light-images/light-logo-full.png';
import AuthForm from '../../WholeComponents/AuthForm';

class AuthUi extends Component {
    constructor(props) {
        super(props);

        this.refreshPage = this.refreshPage.bind(this);
        this.afterRender = this.afterRender.bind(this);
    }

    static propTypes = {
        titleText: PropTypes.string,
        fields: (PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string,
            value: PropTypes.string,
            placeholder: PropTypes.string,
            autoFocus: PropTypes.bool,
            icon: PropTypes.string,
            onChange: PropTypes.func
        }))),
        submitText: PropTypes.string,
        buttonText: PropTypes.string,
        buttonTo: PropTypes.string,
        loading: PropTypes.bool,
        credentialsExists: PropTypes.bool,
        history: PropTypes.object,
        onSubmit: PropTypes.func
    };

    refreshPage() {
        window.location.reload();
    }

    afterRender() {
        if(this.props.credentialsExists) {
            var mainPath = getMainPath();
            this.props.history.push(mainPath);
        }
    }

    componentDidUpdate() {
        this.afterRender();
    }

    componentDidMount() {
        this.afterRender();
    }

    render() {
        return (
            <div className={style.wrap}>
                <img className={style.logoFull} src={lightLogoFull} onClick={this.refreshPage} />
                <AuthForm
                    titleText={this.props.titleText}
                    fields={this.props.fields}
                    submitText={this.props.submitText}
                    buttonText={this.props.buttonText}
                    buttonTo={this.props.buttonTo}
                    loading={this.props.loading}
                    onSubmit={this.props.onSubmit}
                />
            </div>
        );
    }
}

AuthUi = withRouter(AuthUi);

export default AuthUi;
