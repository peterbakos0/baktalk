import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import FriendUnfriendUi from '../UiComponents/FriendUnfriendUi/FriendUnfriendUi';

class FriendUnfriend extends Component {
    constructor() {
        super();

        this.handleError = this.handleError.bind(this);
        this.unfriend = this.unfriend.bind(this);

        this.initialState = {
            loading: false
        };

        this.state = this.initialState;
    }

    static propTypes = {
        friendId: PropTypes.string
    };

    handleError() {
        console.error(new Error());
        this.setState(this.initialState);
    }

    async unfriend() {
        if(this.props.loading) { return; }

        this.setState({
            loading: true
        });

        var success = await client.operations.unfriend(this.props.friendId);
        if(!success) {
            this.handleError();
            return;
        }

        this.setState({
            loading: false
        });
    }

    render() {
        return (<FriendUnfriendUi loading={this.state.loading} onClick={this.unfriend} />);
    }
}

export default FriendUnfriend;
