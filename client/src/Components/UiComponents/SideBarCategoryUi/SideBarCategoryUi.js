import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './SideBarCategoryUi.module.css';
import chevronDownSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/chevron-down-solid-light-icon.png';
import chevronRightSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/chevron-right-solid-light-icon.png';

class SideBarCategoryUi extends Component {
    constructor(props) {
        super(props);

        this.onArrowClick = this.onArrowClick.bind(this);
    }

    static propTypes = {
        name: PropTypes.string,
        showContent: PropTypes.bool,
        onShowContentChange: PropTypes.func,
        children: PropTypes.node
    };

    onArrowClick() {
        this.props.onShowContentChange(!(this.props.showContent));
    }

    render() {
        return (
            <div className={style.wrap}>
                <div className={style.info}>
                    <img
                        className={style.arrow}
                        src={(this.props.showContent ? chevronDownSolidLightIcon : chevronRightSolidLightIcon)}
                        onClick={this.onArrowClick}
                    />
                    <label className={style.name}>{this.props.name}</label>
                </div>
                {(this.props.showContent ? <div className={style.container}>{this.props.children}</div> : null)}
            </div>
        );
    }
}

export default SideBarCategoryUi;
