import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { CreateRoomForm, QuizDetailForm } from '../../components';
import { useHistory } from 'react-router-dom';

export default () => {
	const { push } = useHistory();
	const { currentUser } = useAuth();
	const [roomData, setRoomData] = useState({});
	const [quizData, setQuizData] = useState({});
	const [showRoomForm, setShowRoomForm] = useState(false);

	const handleCreateRoomSubmit = async (roomFormData) => {
		try {
			setRoomData(roomFormData);
			const { data } = await axios.post(`${process.env.BASE_URL}/rooms`, {
				name: roomData.roomName,
				owner: currentUser.uid,
				max_room_size: roomData.maxPlayers,
				public_room: roomData.public,
				entry_pass: roomData.public ? null : roomData.password,
			});
			setRoomData(data);
			setShowRoomForm(false);
		} catch (err) {
			console.error(err);
		}
	};

	const handleCreateQuizSubmit = async (quizFormData) => {
		try {
			setQuizData(quizFormData);
			await axios.post(`${process.env.BASE_URL}/quiz`, {
				room_id: quizData.room_id,
				category: quizData.category,
				difficulty: quizData.difficulty,
				num_questions: quizData.numberOfQuestions,
			});
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
