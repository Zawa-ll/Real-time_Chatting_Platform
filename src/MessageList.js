import React from "react";
import moment from "moment";

const Message = ({ message }) => {
    const bubbleStyle = {
        display: "inline-block",
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: "20px",
        marginBottom: "10px",
        maxWidth: "70%",
    };

    const authorStyle = {
        fontSize: "14px",
        color: "#666",
        textAlign: "right",
    };

    return (
        <li style={{ textAlign: message.email === "current_user_email" ? "right" : "left" }}>
            <div className="columns">
                <div className="column is-three-quarters">
                    <div style={bubbleStyle}>{message.text}</div>
                </div>
                <div className="column">
                    <p className="is-light" style={authorStyle}>
                        {message.email} @ {moment(message.created).format("h:mm a")}
                    </p>
                </div>
            </div>
        </li>
    );
};

const MessageList = ({ messages }) => {
    const messageListStyle = {
        height: "80vh",
        listStyleType: "none",
        padding: "0",
        margin: "0",
        overflowY: "auto",
    };

    return (
        <ul style={messageListStyle}>
            {Object.keys(messages)
                .map((messageKey) => ({ ...messages[messageKey], id: messageKey }))
                .map((message) => (
                    <Message key={message.id} message={message}>
                        {message.text}
                    </Message>
                ))}
        </ul>
    );
};

export default MessageList;
