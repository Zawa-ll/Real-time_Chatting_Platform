import React from "react";
import moment from "moment";

const Message = ({ message, currentUserEmail }) => {
    const isCurrentUser = message.email === currentUserEmail;

    const bubbleStyle = {
        backgroundColor: isCurrentUser ? "#007bff" : "#f0f0f0",
        color: isCurrentUser ? "#fff" : "#333",
        borderRadius: "20px",
        marginBottom: "10px",
        padding: "8px",
        textAlign: "left",
        alignSelf: "flex-start",
        maxWidth: "60%",
        minWidth: "40px", // Set the minimum width to fit at least two characters
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
    };


    const authorStyle = {
        fontSize: "14px",
        color: "#666",
        textAlign: "left",
        opacity: 1,
    };

    const timestampStyle = {
        fontSize: "12px",
        color: "#666",
        textAlign: "left",
        marginTop: "4px",
    };

    return (
        <li style={{ display: "flex", justifyContent: "flex-start" }}>
            <div className="columns">
                <div className="column is-three-quarters">
                    <div style={bubbleStyle}>{message.text}</div>
                </div>

                <div className="column">
                    <div style={timestampStyle}>
                        {message.email} @ {moment(message.created).format("h:mm a")}
                    </div>
                </div>
            </div>
        </li>
    );
};

const MessageList = ({ messages, currentUserEmail }) => {
    const messageListStyle = {
        height: "80vh",
        width: "100%", // Set the width to 100% to fill the available space
        listStyleType: "none",
        padding: "0",
        margin: "0",
        overflowY: "auto",
    };

    return (
        <ul style={messageListStyle}>
            {Object.values(messages).map((message) => (
                <Message key={message.id} message={message} currentUserEmail={currentUserEmail} />
            ))}
        </ul>
    );
};

export default MessageList;
