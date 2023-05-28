import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './AuthFieldListUi.module.css';
import FormField from '../../WholeComponents/FormField';

class AuthFieldListUi extends Component {
    static propTypes = {
        fields: (PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string,
            value: PropTypes.string,
            placeholder: PropTypes.string,
            autoFocus: PropTypes.bool,
            icon: PropTypes.string,
            onChange: PropTypes.func
        })))
    };

    render() {
        var fields = this.props.fields;

        var fieldComponents = [];
        for(var i = 0; i < fields.length; i++) {
            var field = fields[i];

            fieldComponents.push(
                <FormField
                    type={field.type}
                    value={field.value}
                    placeholder={field.placeholder}
                    autoFocus={field.autoFocus}
                    icon={field.icon}
                    onChange={field.onChange}
                    key={i}
                />
            );
        }

        return (<div className={style.wrap}>{fieldComponents}</div>);
    }
}

export default AuthFieldListUi;
