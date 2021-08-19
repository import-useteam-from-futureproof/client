import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useQuiz } from '../../contexts/QuizContext';
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function Results({ results, onQuizEnd }) {
	let { currentUser } = useAuth();
	const { quizData } = useQuiz();
	const { roomData } = useQuiz();
	const [hostBool, setHostBool] = useState(false);
	useEffect(() => {
		if (roomData.owner === currentUser.uid) {
			setHostBool(true);
		}
		console.log(roomData.owner);
		console.log(currentUser.uid);
	}, [quizData, roomData]);

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
			// 	//Do I need to make all participants leave, probably not
			// 	// let userLeaveRoomPost = await axios.post(`${BASE_URL}/rooms/${results[i].roomId/}`)
		}
		let closeRoom = await axios.patch(`${BASE_URL}/rooms/${results[0].roomName}/close`);
		onQuizEnd();
	};

	return (
		<section>
			<h1>Results</h1>
			<ul>{renderResults()}</ul>
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
