import React from 'react';
import { NavBar } from '../../components';
import { Leaderboard } from '../../layout';

export default () => {
	return (
		<>
			<NavBar />
			<main>
				<h1>High Scores</h1>
				<Leaderboard />
			</main>
		</>
	);
};
