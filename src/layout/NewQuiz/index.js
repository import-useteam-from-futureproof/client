import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useQuiz } from '../../contexts/QuizContext';
import { CreateRoomForm, CreateQuizForm } from '../../components';
import { useHistory } from 'react-router-dom';

export default () => {
	const { createRoom, createQuiz, room } = useQuiz();
	const { push } = useHistory();
	const { currentUser } = useAuth();
	const [showRoomForm, setShowRoomForm] = useState(true);

	const handleCreateRoomSubmit = async (roomFormData) => {
		try {
			await createRoom({ ...roomFormData, ownerId: currentUser.uid });
			setShowRoomForm(false);
		} catch (err) {
			console.error(err);
		}
	};

	const handleCreateQuizSubmit = async (quizFormData) => {
		try {
			await createQuiz(quizFormData);
			push(`/quiz/${room._id}`);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<section>
			{showRoomForm ? (
				<CreateRoomForm onSubmit={handleCreateRoomSubmit} />
			) : (
				<CreateQuizForm onSubmit={handleCreateQuizSubmit} />
			)}
		</section>
	);
};
