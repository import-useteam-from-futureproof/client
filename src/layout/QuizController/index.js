import React, { useState, useEffect } from 'react';
import { LobbyWaitingRoom, Game, Results } from '../../components';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const QuizController = ({ socket }) => {
	const { id } = useParams();
	const { currentUser } = useAuth();
	const [component, setComponent] = useState('WaitingRoom');
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		setPlayers((prevState) => [...prevState, { roomId: id, userId: currentUser.uid, score: null }]);

		socket.on('joinRoom', (response) => {
			if (response.userId === currentUser.uid) {
				return;
			}
			console.log('joinRoom', response);
			setPlayers((prevState) => [
				...prevState,
				{ roomId: response.userId, userId: response.uid, score: null },
			]);
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
			setComponent('Results');
		});
	}, []);

	useEffect(() => {
		console.log('players', players);
	}, [players]);

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

	const componentToLoad = () => {
		switch (component) {
			case 'WaitingRoom':
				return <LobbyWaitingRoom hostStartedQuiz={handleHostStart} />;
			case 'Game':
				return <Game onGameEnd={handleGameEnd} />;
			case 'Results':
				return <Results results={players} />;
			default:
				return <h1>Loading component...</h1>;
		}
	};

	return (
		<section>
			{componentToLoad()}
		</section>
	);
};

export default QuizController;

// {
// 	roomName: '611e2aa15de071597b99d864',
// 	score: null,
// 	userId: 'uhv4bZUTx5U4998zhsMWo6TWg503',
// 	username: currentUser.displayName,
// },
