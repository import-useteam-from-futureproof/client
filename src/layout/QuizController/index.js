import React, { useState, useEffect } from 'react';
import { LobbyWaitingRoom, Game, Results } from '../../components';

const QuizController = ({ socket }) => {
	const [component, setComponent] = useState('WaitingRoom');
	useEffect(() => {
		socket.on('advanceGame', (component) => {
			setComponent(component);
		});
	}, []);

	const handleGameEnd = (answers) => {
		console.log(answers);
	};

	const handleHostStart = (roomId) => {
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

	return <>{componentToLoad()}</>;
};

export default QuizController;
