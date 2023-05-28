import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './AuthFormUi.module.css';
import AuthFieldList from '../../WholeComponents/AuthFieldList';
import FormButton from '../../WholeComponents/FormButton';

class AuthFormUi extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
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
        onSubmit: PropTypes.func
    };

    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit();
    }

    render() {
        return (
            <div className={style.wrap}>
                <form className={style.form} autoComplete='off' spellCheck={false} onSubmit={this.onSubmit}>
                    <label className={style.title}>{this.props.titleText}</label>
                    <AuthFieldList fields={this.props.fields} />
                    <FormButton type='submit' text={this.props.submitText} color='#5599FF' solid={true} loading={this.props.loading} />
                    <div className={style.line}>
                        <label>Or</label>
                    </div>
                    <Link className={style.buttonLink} to={this.props.buttonTo}>
                        <FormButton type='button' text={this.props.buttonText} color='#5599FF' solid={false} />
                    </Link>
                </form>
            </div>
        );
    }
}

export default AuthFormUi;
