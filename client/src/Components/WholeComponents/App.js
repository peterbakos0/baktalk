import React, { Component } from 'react';
import client from '../../client';
import AppUi from '../UiComponents/AppUi/AppUi';

class App extends Component {
    constructor() {
        super();

        this.init = this.init.bind(this);
        this.uninit = this.uninit.bind(this);
        this.rerender = this.rerender.bind(this);
    }

    init() {
        client.on('reset', this.rerender);
    }

    uninit() {
        client.off('reset', this.rerender);
    }

    rerender() {
        this.forceUpdate();
    }

    componentWillUnmount() {
        this.uninit();
    }

    componentDidMount() {
        this.init();
    }

    render() {
        return (<AppUi />);
    }
}

export default App;
