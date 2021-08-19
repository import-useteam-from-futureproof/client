import React, { useState, useEffect } from 'react';
import { LobbyWaitingRoom, Game, Results } from '../../components';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const QuizController = ({ socket }) => {
	const { id } = useParams();
	const { currentUser } = useAuth();
	const [component, setComponent] = useState('WaitingRoom');
	const [players, setPlayers] = useState([]);
	const { push } = useHistory();

	useEffect(() => {
		setPlayers((prevState) => [
			...prevState,
			{ roomId: id, userId: currentUser.uid, score: null, username: currentUser.displayName },
		]);

		socket.on('joinRoom', (response) => {
			setPlayers((prevState) => {
				if (
					response.userId === currentUser.uid ||
					!response.userId ||
					prevState.some((player) => player.userId == response.userId)
				) {
					return prevState;
				}
				return [
					...prevState,
					{ roomId: id, userId: response.userId, score: null, username: response.username },
				];
			});
		});

		socket.on('endGame', () => {
			push('/Lobby');
		});

		socket.on('advanceGame', (response) => {
			setComponent(response.component);
			setPlayers(response.players);
		});

		socket.on('userFinished', (playerResult) => {
			setPlayers((prevState) => {
				return prevState.map((player) =>
					player.userId === playerResult.userId ? playerResult : player
				);
			});
			if (playerResult.userId === currentUser.uid) {
				setComponent('Results');
			}
		});
	}, []);

	const handleGameEnd = (answers) => {
		const data = {
			score: answers.reduce((acc, curr) => {
				return acc + curr.score;
			}, 0),
			roomName: id,
			userId: currentUser.uid,
			username: currentUser.displayName,
		};
		socket.emit('userFinished', data);
	};

	const handleHostStart = (roomId) => {
		socket.emit('advanceGame', {
			component: 'Game',
			roomName: roomId,
			players: players,
		});
	};

	const handleQuizEnd = () => {
		socket.emit('endGame', id);
	};

	const componentToLoad = () => {
		switch (component) {
			case 'WaitingRoom':
				return <LobbyWaitingRoom hostStartedQuiz={handleHostStart} />;
			case 'Game':
				return <Game onGameEnd={handleGameEnd} />;
			case 'Results':
				return <Results results={players} onQuizEnd={handleQuizEnd} />;
			default:
				return <h1>Loading component...</h1>;
		}
	};

	return <section>{componentToLoad()}</section>;
};

export default QuizController;
