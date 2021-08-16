import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default () => {
	const [leaderboardData, setLeaderboardData] = useState([]);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const BASE_URL = 'http://localhost:5000';

	useEffect(() => {
		const fetchLeaderboardData = async () => {
			try {
				setIsError(false);
				setIsLoading(true);
				const { data } = await axios.get(`${BASE_URL}/highscores`);
				setLeaderboardData(data);
				setIsLoading(false);
			} catch (err) {
				console.error(err);
				setIsLoading(false);
				setIsError(true);
			}
		};

		fetchLeaderboardData();
	}, []);

	const renderLeaderboardData = () =>
		leaderboardData.map(({ username, score }, i) => (
			<li>
				<span>{username}</span>
				<span>{score}</span>
				{i === leaderboardData.length - 1 ? null : <hr />}
			</li>
		));

	return (
		<ul aria-label="leaderboard">
			{isLoading ? (
				'Loading...'
			) : isError ? (
				<p>
					Oops! Something went wrong (ノಠ益ಠ)ノ彡┻━┻
					<br /> Please refresh or try again later.
				</p>
			) : (
				renderLeaderboardData()
			)}
		</ul>
	);
};
