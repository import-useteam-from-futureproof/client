import React, { useState, useEffect } from 'react';
import { useQuiz } from '../../contexts/QuizContext';
import { useAuth } from '../../contexts/AuthContext';

const LobbyWaitingRoom = ({ hostStartedQuiz }) => {
	const [host, setHostBool] = useState(false);
	const { roomData } = useQuiz();
	const { quizData } = useQuiz();
	const { currentUser } = useAuth();

	useEffect(async () => {
		// const { data } = await axios.get(`${API_URL}/rooms`);
		// console.log(data);
		// console.log(currentUser);
		if (roomData.owner === currentUser.uid) {
			setHostBool(true);
		}
		console.log(quizData);
	}, []);

	const quizStart = () => {
		hostStartedQuiz();
	};

	const renderHostPage = () => {
		return (
			<form onSubmit={quizStart}>
				<h1>You are the host</h1>
				<h2>Category: {quizData.category}</h2>
				<h2>Difficulty: {quizData.difficulty}</h2>
				<h2>Number of questions: {quizData.questions.length}</h2>
				<input type="submit" value="Start the quiz!"></input>
			</form>
		);
	};

	const renderParticipantPage = () => {
		return (
			<div>
				<h1>Waiting for the host to start the game..</h1>
			</div>
		);
	};

	return <>{host ? renderHostPage() : renderParticipantPage()}</>;
};

export default LobbyWaitingRoom;
