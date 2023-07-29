import React, { Component } from 'react';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';

const ChatPanel = (props) => {
    return (
        <div className='column is-fullwidth'>
            {/* <MessageList messages={props.messages} /> */}
            <MessageList messages={props.messages} currentUserEmail={props.email} />
            <SendMessageForm
                sendMessage={props.sendMessage}
                email={props.email}
                roomId={props.roomId}
                uid={props.uid} />
        </div>
    )
}

export default ChatPanel;