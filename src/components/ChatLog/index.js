import React from 'react';
import styles from './style.module.css';

// Define two styles and put them depending on if you send the message or not.

const ChatLog = ({ chatHistory }) => {
	return chatHistory.map((msg, i) => (
		<li aria-label="list" key={i} className={styles.newMessage}>
			<span>{msg.username}: </span>
			{msg.message}
		</li>
	));
};

export default ChatLog;
