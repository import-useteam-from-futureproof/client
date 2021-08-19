import React, { useState, useEffect } from 'react';
import { useQuiz } from '../../contexts/QuizContext';
import { useAuth } from '../../contexts/AuthContext';
import styles from './style.module.css';

const LobbyWaitingRoom = ({ hostStartedQuiz }) => {
	const [host, setHostBool] = useState(false);
	const [loading, setLoading] = useState(true);
	const { roomData } = useQuiz();
	const { quizData } = useQuiz();
	const { currentUser } = useAuth();

	useEffect(() => {
		if (Object.keys(quizData).length !== 0 && Object.keys(roomData).length !== 0) {
			setLoading(false);
		}

		if (roomData.owner === currentUser.uid) {
			setHostBool(true);
		}
	}, [quizData]);

	const quizStart = (e) => {
		e.preventDefault();
		hostStartedQuiz(roomData.id);
	};

	const decidePage = () => {
		return host ? renderHostPage() : renderParticipantPage();
	};

	const renderHostPage = () => {
		return (
			<form onSubmit={quizStart}>
				<h1>You are the host</h1>
				<h2>Category: {quizData.category}</h2>
				<h2>Difficulty: {quizData.difficulty}</h2>
				<h2>Number of questions: {quizData.questions.length}</h2>
				<h2>Players in room: {roomData.participants.length}</h2>
				<input type="submit" value="Start the quiz!"></input>
			</form>
		);
	};

	const renderParticipantPage = () => {
		return (
			<>
				<h1>Waiting for the host to start the game..</h1>
				<h2>Category: {quizData.category}</h2>
				<h2>Difficulty: {quizData.difficulty}</h2>
				<h2>Number of questions: {quizData.questions.length}</h2>
			</>
		);
	};

	return <>{loading ? <h1>Loading room...</h1> : decidePage()}</>;
};

export default LobbyWaitingRoom;
