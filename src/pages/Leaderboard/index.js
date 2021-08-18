import React from 'react';
import { NavBar } from '../../components';
import { Leaderboard } from '../../layout';
import styles from './style.module.css';

export default () => {
	return (
		<>
			<NavBar />
			<main>
				<h1 className={styles.welcomeHeader}>High Scores</h1>
				<Leaderboard />
			</main>
		</>
	);
};
