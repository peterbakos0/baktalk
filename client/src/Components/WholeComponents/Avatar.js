import React, { Component } from 'react';
import PropTypes from 'prop-types';
import client from '../../client';
import AvatarUi from '../UiComponents/AvatarUi/AvatarUi';

class Avatar extends Component {
    static propTypes = {
        userId: PropTypes.string,
        sizePx: PropTypes.number
    };

    render() {
        var user = (client.db.users.findById(this.props.userId) || {});

        return (<AvatarUi fileId={user.avatarFileId} sizePx={this.props.sizePx} />);
    }
}

export default Avatar;
