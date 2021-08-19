import React, { useEffect } from 'react';
import { useQuiz } from '../../contexts/QuizContext';
import { useParams } from 'react-router-dom';
import { Chatroom, NavBar } from '../../components';
import { QuizController } from '../../layout';
import styles from './styles.module.css';

export default () => {
	const { id } = useParams();
	const { fetchRoomData } = useQuiz();
	useEffect(() => {
		fetchRoomData(id);
	}, []);
	return (
		<>
			<NavBar />
			<main className={styles.lobbyContainer}>
				<h1 className={styles.welcomeHeader}>Let's play</h1>
				<Chatroom />;
				<QuizController />;
			</main>
		</>
	);
};
