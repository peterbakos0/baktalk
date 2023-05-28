import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './FormButtonUi.module.css';
import DotsLoader from '../../WholeComponents/DotsLoader';

class FormButtonUi extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    static propTypes = {
        type: PropTypes.string,
        text: PropTypes.string,
        color: PropTypes.string,
        solid: PropTypes.bool,
        loading: PropTypes.bool,
        onClick: PropTypes.func
    };

    onClick() {
        if(this.props.onClick) { this.props.onClick(); }
    }

    render() {
        var buttonColor = (this.props.solid ? '#17181A' : this.props.color);

        return (
            <div
                className={style.wrap}
                style={{
                    width: this.props.width
                }}
            >
                <button
                    className={(style.button + ' ' + (this.props.solid ? style.solidButton : style.notSolidButton))}
                    type={this.props.type}
                    onClick={this.onClick}
                    style={{
                        border: (this.props.solid ? 'none' : ('1px solid ' + this.props.color)),
                        color: buttonColor,
                        backgroundColor: (this.props.solid ? this.props.color : '#17181A')
                    }}
                >
                    {(this.props.loading ? <DotsLoader color={buttonColor} /> : this.props.text)}
                </button>
            </div>
        );
    }
}

export default FormButtonUi;
