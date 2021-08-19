import React, { useRef, useState, useEffect } from 'react';
import { ChatLog } from '../index';
import { useQuiz } from '../../contexts/QuizContext';
import { useAuth } from '../../contexts/AuthContext';
import styles from './style.module.css';

const Chatroom = ({ socket }) => {
	const [chatHistory, setChatHistory] = useState([
		{ username: 'chatbot', message: 'Welcome to the chatroom' },
	]);

	const [chatInput, setChatInput] = useState('');

	const { roomData } = useQuiz();
	const { currentUser } = useAuth();

	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [chatHistory]);

	useEffect(() => {
		socket.on('newMessage', (message) => {
			if (message.username === currentUser.displayName) {
				message.username = 'You';
			}
			updateChatHistory(message);
		});
	}, []);

	const updateChatInput = (e) => {
		setChatInput(e.target.value);
	};

	const sendMessage = (e) => {
		e.preventDefault();
		socket.emit('newMessage', {
			message: chatInput,
			roomName: roomData.id,
			username: currentUser.displayName,
		});
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
		<section aria-label="chat room" className={styles.chatroomContainer}>
			<div>
				<ul>
					<ChatLog chatHistory={chatHistory} />
					<div ref={messagesEndRef}></div>
				</ul>
			</div>
			<form onSubmit={sendMessage}>
				<input type="text" onChange={updateChatInput} value={chatInput} />
				<input type="submit" value="Send" />
			</form>
		</section>
	);
};

export default Chatroom;
