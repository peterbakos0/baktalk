import React, { Component } from 'react';
import client from '../../client';
import FriendRoutesUi from '../UiComponents/FriendRoutesUi/FriendRoutesUi';

class FriendRoutes extends Component {
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
        var friends = client.db.friends.find({});

        var friendIds = [];
        for(var i = 0; i < friends.length; i++) { friendIds.push(friends[i]._id); }

        return (<FriendRoutesUi friendIds={friendIds} />);
    }
}

export default FriendRoutes;
