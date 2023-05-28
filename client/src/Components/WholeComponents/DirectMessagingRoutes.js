import React, { Component } from 'react';
import client from '../../client';
import DirectMessagingRoutesUi from '../UiComponents/DirectMessagingRoutesUi/DirectMessagingRoutesUi';

class DirectMessagingRoutes extends Component {
    constructor() {
        super();

        this.init = this.init.bind(this);
        this.uninit = this.uninit.bind(this);
        this.rerender = this.rerender.bind(this);
    }

    init() {
        client.on('change', this.rerender);
    }

    uninit() {
        client.off('change', this.rerender);
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
        var directMessagings = client.db.directMessagings.find({});

        var directMessagingIds = [];
        for(var i = 0; i < directMessagings.length; i++) { directMessagingIds.push(directMessagings[i]._id); }

        return (<DirectMessagingRoutesUi directMessagingIds={directMessagingIds} />);
    }
}

export default DirectMessagingRoutes;
