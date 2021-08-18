import React, { useState, useEffect } from 'react';
import { useQuiz } from '../../contexts/QuizContext';
import { useAuth } from '../../contexts/AuthContext';

const LobbyWaitingRoom = () => {
	// const [ setQuizUser] = useState('participant');
	const { roomData } = useQuiz();
	const { currentUser } = useAuth();

	useEffect(() => {});
	console.log(roomData);
	console.log(currentUser.uid);
	return (
		<>
			<div>
				<h1>Waiting...</h1>
			</div>
		</>
	);
};

export default LobbyWaitingRoom;
