import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useQuiz } from '../../contexts/QuizContext';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function Results({ results, onQuizEnd }) {
	let { currentUser } = useAuth();
	const { quizData } = useQuiz();
	const { roomData } = useQuiz();
	const [hostBool, setHostBool] = useState(false);
	const [allUsersComplete, setAllUsersComplete] = useState(false);
	const canvasRef = useRef(null);
	useEffect(() => {
		if (roomData.owner === currentUser.uid) {
			setHostBool(true);
		}
	}, [quizData, roomData]);

	useEffect(() => {
		console.log(results.some((result) => result.score === null));
		if (!results.some((result) => result.score === null)) {
			console.log('settingIsHappening');
			setAllUsersComplete(true);
		}
		console.log(allUsersComplete);
	}, [results]);

	useEffect(() => {
		if (allUsersComplete) {
			const canvas = canvasRef.current;
			const context = canvas.getContext('2d');
			let scores = results.map((result) => result.score);
			let players = results.map((result) => result.username);
			var myChart = new Chart(context, {
				type: 'bar',
				data: {
					labels: players,
					datasets: [
						{
							label: '# of Points',
							data: scores,
							backgroundColor: [
								'rgba(255, 99, 132, 0.2)',
								'rgba(54, 162, 235, 0.2)',
								'rgba(255, 206, 86, 0.2)',
								'rgba(75, 192, 192, 0.2)',
								'rgba(153, 102, 255, 0.2)',
								'rgba(255, 159, 64, 0.2)',
							],
							borderColor: [
								'rgba(255, 99, 132, 1)',
								'rgba(54, 162, 235, 1)',
								'rgba(255, 206, 86, 1)',
								'rgba(75, 192, 192, 1)',
								'rgba(153, 102, 255, 1)',
								'rgba(255, 159, 64, 1)',
							],
							borderWidth: 1,
						},
					],
				},
				options: {
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				},
			});
		}
	}, [allUsersComplete]);

	const renderResults = () => {
		results.sort((a, b) => {
			if (a.score === null) {
				return -1;
			} else if (b.score === null) {
				return 1;
			} else {
				return b.score - a.score;
			}
		});
		return results.map((result, i) => (
			<li key={i}>
				<span>{result.username}</span>
				<span>{result.score === null ? 'still playing' : result.score}</span>
			</li>
		));
	};

	const submitResults = async (e) => {
		e.preventDefault();
		console.log(results);
		for (let i = 0; i < results.length; i++) {
			try {
				let highScorePatch = await axios.patch(
					`${BASE_URL}/user/${results[i].userId}/highscore/${results[i].score}`
				);
			} catch (err) {
				console.log('1 or more users score was not high enough');
			}
		}
		let closeRoom = await axios.patch(`${BASE_URL}/rooms/${results[0].roomName}/close`);
		onQuizEnd();
	};

	return (
		<section>
			<h1>Results</h1>
			<ul>{renderResults()}</ul>
			{allUsersComplete ? <canvas ref={canvasRef}></canvas> : <></>}
			{!hostBool ? (
				<></>
			) : (
				<form onSubmit={submitResults}>
					<input type="submit" value="End Quiz"></input>
				</form>
			)}
		</section>
	);
}
