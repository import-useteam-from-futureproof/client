import React, { useState } from 'react';

const Chatroom = () => {
	const [chatHistory, setChatHistory] = useState([
		{ username: ChatBot, message: 'Welcome to the chatroom' },
	]);
	const [chatInput, setChatInput] = useState('');

	const updateChatInput = (e) => {
		setChatInput(e.target.value);
	};

	const sendMessage = () => {
		return;
	};

	return (
		<section>
			<form onSubmit={sendMessage}>
				<input type="text" onChange={updateChatInput} value={chatInput} />
				<input type="submit" value="Send" />
			</form>
		</section>
	);
};

export default Chatroom;
