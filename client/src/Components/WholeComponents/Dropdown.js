import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownUi from '../UiComponents/DropdownUi/DropdownUi';

class Dropdown extends Component {
    static propTypes = {
        event: PropTypes.object,
        hasPadding: PropTypes.bool,
        onClose: PropTypes.func,
        children: PropTypes.node
    };

    render() {
        return (<DropdownUi event={this.props.event} hasPadding={this.props.hasPadding} onClose={this.props.onClose}>{this.props.children}</DropdownUi>);
    }
}

export default Dropdown;
