import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './MessageChannelSettingsFormUi.module.css';
import commentAltSolidLightIcon from '../../../assets/images/light-images/light-icons/solid-light-icons/comment-alt-solid-light-icon.png';
import FormField from '../../WholeComponents/FormField';
import MessageChannelSettingsDeleteChannel from '../../WholeComponents/MessageChannelSettingsDeleteChannel';
import FormButton from '../../WholeComponents/FormButton';

class MessageChannelSettingsFormUi extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    static propTypes = {
        channelId: PropTypes.string,
        channelName: PropTypes.string,
        hasPermission: PropTypes.bool,
        loading: PropTypes.bool,
        onChannelNameChange: PropTypes.func,
        onSubmit: PropTypes.func
    };

    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit();
    }

    render() {
        return (
            <div className={style.wrap}>
                <form className={style.form} autoComplete='off' spellCheck={false} onSubmit={this.onSubmit}>
                    <div className={style.top}>
                        <FormField
                            type='text'
                            value={this.props.channelName}
                            placeholder='Channel Name'
                            disabled={!(this.props.hasPermission)}
                            icon={commentAltSolidLightIcon}
                            onChange={this.props.onChannelNameChange}
                        />
                    </div>
                    <div className={style.bottom}>
                        <MessageChannelSettingsDeleteChannel channelId={this.props.channelId} />
                        {(
                            this.props.hasPermission ?
                            <FormButton type='submit' text='Save' width='100%' color='#2CA05A' solid={true} loading={this.props.loading} />
                            : null
                        )}
                    </div>
                </form>
            </div>
        );
    }
}

export default MessageChannelSettingsFormUi;
