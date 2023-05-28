import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideBarMenuUi from '../UiComponents/SideBarMenuUi/SideBarMenuUi';

class SideBarMenu extends Component {
    static propTypes = {
        text: PropTypes.string,
        online: PropTypes.bool,
        selected: PropTypes.bool,
        children: PropTypes.node
    };

    render() {
        return (<SideBarMenuUi text={this.props.text} online={this.props.online} selected={this.props.selected}>{this.props.children}</SideBarMenuUi>);
    }
}

export default SideBarMenu;
