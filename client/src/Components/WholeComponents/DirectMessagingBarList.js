import React, { Component } from 'react';
import client from '../../client';
import DirectMessagingBarListUi from '../UiComponents/DirectMessagingBarListUi/DirectMessagingBarListUi';

class DirectMessagingBarList extends Component {
    constructor() {
        super();

        this.init = this.init.bind(this);
        this.uninit = this.uninit.bind(this);
        this.rerender = this.rerender.bind(this);

        this.mounted = false;
    }

    init() {
        client.on('change', this.rerender);
    }

    uninit() {
        client.off('change', this.rerender);
    }

    rerender() {
        if(this.mounted) { this.forceUpdate(); }
    }

    componentWillUnmount() {
        this.mounted = false;
        this.uninit();
    }

    componentDidMount() {
        this.mounted = true;
        this.init();
    }

    render() {
        var directMessagings = client.db.directMessagings.find({});

        var directMessagingIds = [];
        for(var i = 0; i < directMessagings.length; i++) { directMessagingIds.push(directMessagings[i]._id); }

        return (<DirectMessagingBarListUi directMessagingIds={directMessagingIds} />);
    }
}

export default DirectMessagingBarList;
