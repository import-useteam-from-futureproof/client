import React, { useState, useEffect } from 'react';
import { useQuiz } from '../../contexts/QuizContext';
import { useAuth } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import styles from './style.module.css';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const LobbyWaitingRoom = ({ hostStartedQuiz }) => {
	const { id } = useParams();
	const [host, setHostBool] = useState(false);
	const [loading, setLoading] = useState(true);
	const [numPlayers, setNumPlayers] = useState(1);
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
	}, [quizData, roomData]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(`${BASE_URL}/rooms/${id}`);
				setNumPlayers(data.participants.length);
			} catch (err) {
				console.log(err);
			}
		};

		const intervalId = setInterval(fetchData, 5000);
		return () => clearInterval(intervalId);
	}, []);

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
				<h2>Room name: {roomData.name}</h2>
				<h2>Category: {quizData.category}</h2>
				<h2>Difficulty: {quizData.difficulty}</h2>
				<h2>Number of questions: {quizData.questions.length}</h2>
				<h2>Players in room: {numPlayers}</h2>
				<input type="submit" value="Start the quiz!"></input>
			</form>
		);
	};

	const renderParticipantPage = () => {
		return (
			<>
				<h1>Waiting for the host to start the game..</h1>
				<h2>Room name: {roomData.name}</h2>
				<h2>Category: {quizData.category}</h2>
				<h2>Difficulty: {quizData.difficulty}</h2>
				<h2>Number of questions: {quizData.questions.length}</h2>
				<h2>Players in room: {numPlayers}</h2>
			</>
		);
	};

	return <>{loading ? <h1>Loading room...</h1> : decidePage()}</>;
};

export default LobbyWaitingRoom;
