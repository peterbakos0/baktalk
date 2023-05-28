import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import getMembersPath from '../../../utils/path/get-members-path';
import getRoomPath from '../../../utils/path/get-room-path';
import getMemberPath from '../../../utils/path/get-member-path';
import style from './MemberRoutesUi.module.css';
import Member from '../../WholeComponents/Member';

class MemberRoutesUi extends Component {
    static propTypes = {
        roomId: PropTypes.string,
        memberIds: (PropTypes.arrayOf(PropTypes.string))
    };

    render() {
        var memberIds = this.props.memberIds;

        var membersPath = getMembersPath(this.props.roomId);
        var roomPath = getRoomPath(this.props.roomId);

        var routeComponents = [];
        for(var i = 0; i < memberIds.length; i++) {
            var memberId = memberIds[i];

            var memberPath = getMemberPath(memberId, this.props.roomId);

            routeComponents.push(
                <Route path={memberPath} key={memberId}>
                    <Member memberId={memberId} />
                </Route>
            );
        }

        return (
            <div className={style.wrap}>
                <Switch>
                    {routeComponents}
                    <Route path={membersPath} component={(() => (<Redirect to={roomPath} />))} />
                </Switch>
            </div>
        );
    }
}

export default MemberRoutesUi;
