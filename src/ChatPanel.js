import React, { Component } from 'react';

class SendMessageForm extends Component {
    render() {
        return (
            <form>
                <h1>Send a Message</h1>
            </form>
        )
    }
}

const Message = ({ message }) => {
    return (
        <li>{message.text}</li>
    );
}

const MessageList = ({ messages }) => {
    return (
        <ul>

            {Object.keys(messages)
                .map(messageKey => ({ ...messages[messageKey], id: messageKey }))
                .map(message => <Message key={message.id} message={message}>{message.text}</Message>)
            }
        </ul>
    )
}

const ChatPanel = (props) => {
    return (
        <div>
            <MessageList messages={props.messages} />
            <SendMessageForm />
        </div>
    )
}

export default ChatPanel;