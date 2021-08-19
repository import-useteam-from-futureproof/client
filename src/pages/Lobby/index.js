import React from 'react';
import { NavBar } from '../../components';
import { RoomList, NewQuiz } from '../../layout';
import { useAuth } from '../../contexts/AuthContext';
import styles from './style.module.css';

export default () => {
	const { currentUser } = useAuth();
	return (
		<>
			<NavBar />
			<main className={styles.lobbyContainer}>
				<h1 className={styles.welcomeHeader}>
					Hello {currentUser ? currentUser.displayName : null}
				</h1>
				<RoomList />
				<NewQuiz />
			</main>
		</>
	);
};
