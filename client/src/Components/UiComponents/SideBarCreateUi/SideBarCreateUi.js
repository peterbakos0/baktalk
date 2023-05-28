import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './SideBarCreateUi.module.css';
import plusSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/plus-solid-light-icon.png';

class SideBarCreateUi extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    static propTypes = {
        value: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        onSubmit: PropTypes.func
    };

    onChange(event) {
        this.props.onChange(event.target.value);
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit();
    }

    render() {
        return (
            <div className={style.wrap}>
                <form className={style.form} autoComplete='off' spellCheck={false} onSubmit={this.onSubmit}>
                    <input
                        className={style.textBox}
                        type='text'
                        value={this.props.value}
                        placeholder={this.props.placeholder}
                        onChange={this.onChange}
                    />
                    <button className={style.submit} type='submit'>
                        <img src={plusSolidLightIcon} />
                    </button>
                </form>
            </div>
        );
    }
}

export default SideBarCreateUi;
