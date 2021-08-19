import React, { useState, useEffect } from 'react';
import { LobbyWaitingRoom, Game, Results } from '../../components';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const QuizController = ({ socket }) => {
	const { id } = useParams();
	const { currentUser } = useAuth();
	const [component, setComponent] = useState('WaitingRoom');
	useEffect(() => {
		socket.on('advanceGame', (component) => {
			setComponent(component);
		});
		socket.on('userFinished', (data) => {
			console.log(data);
		});
	}, []);

	const handleGameEnd = (answers) => {
		const data = {
			score: answers.reduce((acc, curr) => {
				return acc + curr.score;
			}, 0),
			roomName: id,
			userId: currentUser.uid,
		};
		socket.emit('userFinished', data);
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
