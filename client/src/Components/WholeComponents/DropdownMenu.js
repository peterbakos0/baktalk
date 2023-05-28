import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownMenuUi from '../UiComponents/DropdownMenuUi/DropdownMenuUi';

class DropdownMenu extends Component {
    static propTypes = {
        id: PropTypes.string,
        text: PropTypes.string,
        icon: PropTypes.string,
        onClick: PropTypes.func
    };

    render() {
        return (<DropdownMenuUi id={this.props.id} text={this.props.text} icon={this.props.icon} onClick={this.props.onClick} />);
    }
}

export default DropdownMenu;
