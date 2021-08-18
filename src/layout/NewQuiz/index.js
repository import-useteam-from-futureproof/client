import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useQuiz } from '../../contexts/QuizContext';
import { CreateRoomForm, CreateQuizForm } from '../../components';
import { useHistory } from 'react-router-dom';
import styles from './style.module.css';

export default () => {
	const { createRoom, createQuiz, roomData } = useQuiz();
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
			push(`/quiz/${roomData._id}`);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<section className={styles.newQuizForm}>
			{showRoomForm ? (
				<CreateRoomForm onSubmit={handleCreateRoomSubmit} />
			) : (
				<CreateQuizForm onSubmit={handleCreateQuizSubmit} />
			)}
		</section>
	);
};
