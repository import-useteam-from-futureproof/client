import React from 'react';

// Define two styles and put them depending on if you send the message or not.

const ChatLog = ({ chatHistory }) => {
	return chatHistory.map((msg, i) => (
		<li key={i}>
			<span>{msg.username}: </span>
			{msg.message}
		</li>
	));
};

export default ChatLog;
