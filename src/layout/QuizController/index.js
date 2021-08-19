import React, { useState, useEffect } from 'react';
import { LobbyWaitingRoom, Game, Results } from '../../components';
import io from 'socket.io-client';
import { useQuiz } from '../../contexts/QuizContext';
import { useAuth } from '../../contexts/AuthContext';

const QuizController = () => {
	const [component, setComponent] = useState('WaitingRoom');
	const { roomData } = useQuiz();
	const { currentUser } = useAuth();
	useEffect(() => {
		const socket = io('https://pursuit-of-trivia.herokuapp.com/');
		socket.emit('joinRoom', { roomName: roomData.id, username: currentUser.displayName });
		socket.on('advanceGame', (component) => {
			console.log(component);
			setComponent(component);
		});
	}, []);

	const handleGameEnd = (answers) => {
		console.log(answers);
	};

	const handleHostStart = (roomId) => {
		console.log(`Quiz Started in room ${roomId}`);
		// Emit something that tells all components to move to Game
		const socket = io('https://pursuit-of-trivia.herokuapp.com/');
		socket.emit('advanceGame', { component: 'Game', roomName: roomId });
	};

	const componentToLoad = () => {
		switch (component) {
			case 'WaitingRoom':
				return <LobbyWaitingRoom hostStartedQuiz={handleHostStart} />;
			case 'Game':
				return <Game onGameEnd={handleGameEnd} />;
			case 'Results':
				return <Results />;
			default:
				return <h1>Loading component...</h1>;
		}
	};

	return (
		<>
			{/* <Game onGameEnd={handleGameEnd} />
			<LobbyWaitingRoom hostStartedQuiz={handleHostStart} />
			<Results /> */}
			{componentToLoad()}
		</>
	);
};

export default QuizController;
