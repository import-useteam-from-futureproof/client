import React, { useEffect } from 'react';
import { useQuiz } from '../../contexts/QuizContext';
import { useParams } from 'react-router-dom';
import { Chatroom, NavBar } from '../../components';
import { QuizController } from '../../layout';

export default () => {
	const { id } = useParams();

	const { fetchRoomData } = useQuiz();
	useEffect(() => {
		fetchRoomData(id);
	}, []);
	return (
		<main>
			<NavBar />
			<Chatroom />;
			<QuizController />;
		</main>
	);
};
