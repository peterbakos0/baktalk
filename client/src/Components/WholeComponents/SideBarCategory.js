import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SideBarCategoryUi from '../UiComponents/SideBarCategoryUi/SideBarCategoryUi';

class SideBarCategory extends Component {
    constructor(props) {
        super(props);

        this.updateShowContent = this.updateShowContent.bind(this);

        this.state = {
            showContent: true
        };
    }

    static propTypes = {
        name: PropTypes.string,
        children: PropTypes.node
    };

    updateShowContent(value) {
        this.setState({
            showContent: value
        });
    }

    render() {
        return (
            <SideBarCategoryUi
                name={this.props.name}
                showContent={this.state.showContent}
                onShowContentChange={this.updateShowContent}
            >
                {this.props.children}
            </SideBarCategoryUi>
        );
    }
}

export default SideBarCategory;
