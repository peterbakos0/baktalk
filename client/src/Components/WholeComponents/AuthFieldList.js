import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthFieldListUi from '../UiComponents/AuthFieldListUi/AuthFieldListUi';

class AuthFieldList extends Component {
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
        return (<AuthFieldListUi fields={this.props.fields} />);
    }
}

export default AuthFieldList;
