import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DotsLoaderUi from '../UiComponents/DotsLoaderUi/DotsLoaderUi';

class DotsLoader extends Component {
    static propTypes = {
        color: PropTypes.string
    };

    render() {
        return (<DotsLoaderUi color={this.props.color} />);
    }
}

export default DotsLoader;
