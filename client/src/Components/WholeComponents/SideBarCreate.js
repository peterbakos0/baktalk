import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideBarCreateUi from '../UiComponents/SideBarCreateUi/SideBarCreateUi';

class SideBarCreate extends Component {
    static propTypes = {
        value: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        onSubmit: PropTypes.func
    };

    render() {
        return (
            <SideBarCreateUi
                value={this.props.value}
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                onSubmit={this.props.onSubmit}
            />
        );
    }
}

export default SideBarCreate;
