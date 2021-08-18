import React, { useState, useEffect } from 'react';
import { ChatLog } from '../index';

import { io } from 'socket.io-client';
// this is where out socket is deployed.
// TODO update the the live socket
const socket = io('https://pursuit-of-trivia.herokuapp.com/');

const Chatroom = () => {
	const [chatHistory, setChatHistory] = useState([
		{ username: 'chatbot', message: 'Welcome to the chatroom' },
	]);
	const [chatInput, setChatInput] = useState('');

	useEffect(() => {
		socket.on('newMessage', (message) => {
			console.log(message);
			updateChatHistory(message);
		});
	}, []);

	// TODO - Get the roomName
	socket.emit('joinRoom', 'tbc');

	const updateChatInput = (e) => {
		setChatInput(e.target.value);
	};

	// TODO - get the right data for here
	const sendMessage = (e) => {
		e.preventDefault();
		socket.emit('newMessage', {
			message: chatInput,
			roomName: 'tbc',
			username: 'user',
		});
		updateChatHistory({ username: 'You', message: chatInput });
		setChatInput('');
	};

	const updateChatHistory = (message) => {
		setChatHistory((prevState) => {
			const newChatHistory = prevState.slice();
			newChatHistory.push(message);
			return newChatHistory;
		});
	};

	return (
		<section>
			<ul>
				<ChatLog chatHistory={chatHistory} />
			</ul>
			<form onSubmit={sendMessage}>
				<input type="text" onChange={updateChatInput} value={chatInput} />
				<input type="submit" value="Send" />
			</form>
		</section>
	);
};

export default Chatroom;
