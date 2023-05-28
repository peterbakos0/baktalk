import shortid from 'shortid';
import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import style from './MessagingHistoryUi.module.css';
import Message from '../../WholeComponents/Message';
import SpinnerLoader from '../../WholeComponents/SpinnerLoader';
import Blank from '../../WholeComponents/Blank';

class MessagingHistoryUi extends Component {
    constructor(props) {
        super(props);

        this.wrapRef = createRef();

        this.checkIfScrolledToTop = this.checkIfScrolledToTop.bind(this);
        this.afterRender = this.afterRender.bind(this);
    }

    static propTypes = {
        messages: (PropTypes.arrayOf(PropTypes.shape({
            messageId: PropTypes.string,
            hasFile: PropTypes.bool,
            authorId: PropTypes.string,
            isReply: PropTypes.bool,
            time: PropTypes.number,
            dateString: PropTypes.string
        }))),
        mode: PropTypes.string,
        loading: PropTypes.bool,
        onScrollToTop: PropTypes.func,
        onMessageReply: PropTypes.func,
        onMessageEdit: PropTypes.func
    };

    checkIfScrolledToTop() {
        var scroll = (1 - this.wrapRef.current.scrollTop);
        var maxScroll = (this.wrapRef.current.scrollHeight - this.wrapRef.current.offsetHeight);

        if(scroll >= maxScroll) { this.props.onScrollToTop(); }
    }

    afterRender() {
        this.checkIfScrolledToTop();
    }

    componentDidUpdate() {
        this.afterRender();
    }

    componentDidMount() {
        this.afterRender();
    }

    render() {
        var messages = this.props.messages;

        var lastAuthorTime = null;

        var content = [];

        for(var i = 0; i < messages.length; i++) {
            var message = messages[i];

            var nextMessage = (messages[i + 1] || {});

            lastAuthorTime = (lastAuthorTime || message.time);
            var timeDiff = (lastAuthorTime - nextMessage.time);

            var showAuthor = (
                (message.authorId !== nextMessage.authorId) ||
                (timeDiff >= 60000) ||
                message.hasFile ||
                message.isReply ||
                (this.props.mode === 'filter')
            );

            content.push(
                <Message
                    messageId={message.messageId}
                    showAuthor={showAuthor}
                    onReply={this.props.onMessageReply}
                    onEdit={this.props.onMessageEdit}
                    key={message.messageId}
                />
            );

            if(showAuthor) {
                if(message.dateString === nextMessage.dateString) {
                    content.push(<div className={style.space} key={shortid.generate()}></div>);
                }
                else {
                    content.push(
                        <div className={style.dateLine} key={shortid.generate()}>
                            <label>{message.dateString}</label>
                        </div>
                    );
                }

                lastAuthorTime = null;
            }
        }

        if(this.props.loading) {
            content.push(
                <div className={style.spinnerLoaderContainer} key={shortid.generate()}>
                    <SpinnerLoader />
                </div>
            );
        }

        return (<div className={style.wrap} ref={this.wrapRef} onScroll={this.checkIfScrolledToTop}>{(content.length ? content : <Blank />)}</div>);
    }
}

export default MessagingHistoryUi;
