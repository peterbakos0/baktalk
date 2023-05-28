import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChangeableImageUi from '../UiComponents/ChangeableImageUi/ChangeableImageUi';

class ChangeableImage extends Component {
    static propTypes = {
        fileUrl: PropTypes.string,
        hoverText: PropTypes.string,
        onChange: PropTypes.func,
        children: PropTypes.node
    };

    render() {
        return (
            <ChangeableImageUi
                fileUrl={this.props.fileUrl}
                hoverText={this.props.hoverText}
                onChange={this.props.onChange}
            >
                {this.props.children}
            </ChangeableImageUi>
        );
    }
}

export default ChangeableImage;
