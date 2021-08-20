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
			<form className={styles.form} onSubmit={quizStart}>
				<h1>{roomData.name}</h1>
				<hr />
				<p>You are the host</p>
				<hr />
				<p className={styles.roomInfo}>
					Category: <span>{quizData.category}</span>
				</p>
				<hr />
				<p className={styles.roomInfo}>
					Difficulty: <span>{quizData.difficulty}</span>
				</p>
				<hr />
				<p className={styles.roomInfo}>
					Number of questions: <span>{quizData.questions.length}</span>
				</p>
				<hr />
				<p className={styles.roomInfo}>
					Players in room: <span>{numPlayers}</span>
				</p>
				<hr />
				<p>
					You have 20 seconds to answer each question. <br /> The faster you answer the higher your
					score!
				</p>
				<hr />
				<input className={styles.button} type="submit" value="Start the quiz!"></input>
			</form>
		);
	};

	const renderParticipantPage = () => {
		return (
			<div className={styles.form} role="presentation">
				<h1>{roomData.name}</h1>
				<hr />
				<p>Waiting for the host to start the game...</p>
				<hr />
				<p className={styles.roomInfo}>
					Category: <span>{quizData.category}</span>
				</p>
				<hr />
				<p className={styles.roomInfo}>
					Difficulty: <span>{quizData.difficulty}</span>
				</p>
				<hr />
				<p className={styles.roomInfo}>
					Number of questions: <span>{quizData.questions.length}</span>
				</p>
				<hr />
				<p className={styles.roomInfo}>
					Players in room: <span>{numPlayers}</span>
				</p>
				<hr />
				<p>
					You have 60 seconds to answer each question. <br /> The faster you answer the higher your
					score!
				</p>
			</div>
		);
	};

	return <>{loading ? <h1>Loading room...</h1> : decidePage()}</>;
};

export default LobbyWaitingRoom;
