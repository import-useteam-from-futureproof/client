import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useQuiz } from '../../contexts/QuizContext';
import { CreateRoomForm, QuizDetailForm } from '../../components';
import { useHistory } from 'react-router-dom';

export default () => {
	const { createRoom, createQuiz } = useQuiz();
	const { push } = useHistory();
	const { currentUser } = useAuth();
	const [roomData, setRoomData] = useState({});
	const [quizData, setQuizData] = useState({});
	const [showRoomForm, setShowRoomForm] = useState(true);

	const handleCreateRoomSubmit = async (roomFormData) => {
		try {
			setRoomData(roomFormData);
			await createRoom({ ...roomData, ownerId: currentUser.uid });
			setShowRoomForm(false);
		} catch (err) {
			console.error(err);
		}
	};

	const handleCreateQuizSubmit = async (quizFormData) => {
		try {
			setQuizData(quizFormData);
			await createQuiz(quizData);
			push(`/quiz/${roomData.room_id}`);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<section>
			{showRoomForm ? (
				<CreateRoomForm onSubmit={handleCreateRoomSubmit} />
			) : (
				<QuizDetailForm onSubmit={handleCreateQuizSubmit} />
			)}
		</section>
	);
};
