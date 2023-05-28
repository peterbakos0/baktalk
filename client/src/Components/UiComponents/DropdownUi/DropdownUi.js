import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import style from './DropdownUi.module.css';

class DropdownUi extends Component {
    constructor(props) {
        super(props);

        this.wrapRef = createRef();

        this.init = this.init.bind(this);
        this.uninit = this.uninit.bind(this);
        this.onWindowClick = this.onWindowClick.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.checkAndMakeSureWrapIsAllInside = this.checkAndMakeSureWrapIsAllInside.bind(this);
        this.makeSureWrapIsAllInside = this.makeSureWrapIsAllInside.bind(this);
        this.afterRender = this.afterRender.bind(this);

        this.state = {
            leftPx: null,
            topPx: null
        };
    }

    static propTypes = {
        event: PropTypes.object,
        hasPadding: PropTypes.bool,
        onClose: PropTypes.func,
        children: PropTypes.node
    };

    static defaultProps = {
        hasPadding: true,
        onClose: (() => {})
    };

    init() {
        window.addEventListener('click', this.onWindowClick);
        window.addEventListener('resize', this.onWindowResize);
    }

    uninit() {
        window.removeEventListener('click', this.onWindowClick);
        window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowClick(event) {
        if(!(event.isTrusted)) { return; }

        var clickX = event.clientX;
        var clickY = event.clientY;

        var wrapRect = this.wrapRef.current.getBoundingClientRect();

        if((clickX < wrapRect.left) || (clickX > wrapRect.right) || (clickY < wrapRect.top) || (clickY > wrapRect.bottom)) { this.props.onClose(); }
    }

    onWindowResize(event) {
        this.setState({
            leftPx: null,
            topPx: null
        });
    }

    checkAndMakeSureWrapIsAllInside() {
        if((this.state.leftPx === null) && (this.state.topPx === null)) { this.makeSureWrapIsAllInside(); }
    }

    makeSureWrapIsAllInside() {
        var wrapRect = this.wrapRef.current.getBoundingClientRect();
        var buttonRect = this.props.event.target.getBoundingClientRect();

        var leftPx = Math.max((wrapRect.left - (wrapRect.width / 2)), 10);
        leftPx = (Math.min((leftPx + wrapRect.width), (window.innerWidth - 10)) - wrapRect.width);

        var topPx;

        if(wrapRect.bottom <= (window.innerHeight - 10)) { topPx = wrapRect.top; }
        else { topPx = (buttonRect.top - wrapRect.height - 10); }

        this.setState({
            leftPx: leftPx,
            topPx: topPx
        });
    }

    afterRender() {
        this.checkAndMakeSureWrapIsAllInside();
    }

    componentDidUpdate() {
        this.afterRender();
    }

    componentWillUnmount() {
        this.uninit();
    }

    componentDidMount() {
        window.requestAnimationFrame(this.init);
        this.afterRender();
    }

    render() {
        var buttonRect = this.props.event.target.getBoundingClientRect();

        var leftPx = (this.state.leftPx || (buttonRect.left + (buttonRect.width / 2)));
        var topPx = (this.state.topPx || (buttonRect.bottom + 10));

        return (
            <div
                className={style.wrap}
                ref={this.wrapRef}
                style={{
                    left: (leftPx + 'px'),
                    top: (topPx + 'px'),
                    padding: (this.props.hasPadding ? '12px' : '0')
                }}
            >
                {this.props.children}
            </div>
        );
    }
}

export default DropdownUi;
