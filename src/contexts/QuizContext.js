import React, { useContext, useState } from 'react';
import axios from 'axios';

const QuizContext = React.createContext();
const BASE_URL = process.env.REACT_APP_BASE_URL;

export function useQuiz() {
	return useContext(QuizContext);
}

export function QuizProvider({ children }) {
	const [roomData, setRoomData] = useState({});
	const [quizData, setQuizData] = useState({});

	async function createRoom(newRoomData) {
		try {
			const { data } = await axios.post(`${BASE_URL}/rooms`, {
				name: newRoomData.roomName,
				owner: newRoomData.ownerId,
				max_room_size: newRoomData.maxPlayers,
				public_room: newRoomData.public,
				entry_pass: newRoomData.public ? null : newRoomData.password,
			});
			setRoomData(data);
			return roomData;
		} catch (err) {
			console.error(err);
		}
	}

	async function createQuiz(newQuizData) {
		try {
			if (!roomData._id) {
				throw new Error('You must create a room before you can create a quiz');
			}
			const { data } = await axios.post(`${BASE_URL}/quiz`, {
				room_id: roomData._id,
				category: newQuizData.category,
				difficulty: newQuizData.difficulty,
				num_questions: newQuizData.numberOfQuestions,
			});
			setQuizData(data);
			return quizData;
		} catch (err) {
			console.error(err);
		}
	}

	async function fetchRoomData(roomId) {
		const roomFetch = await axios.get(`${BASE_URL}/rooms/${roomId}`);
		const currentRoom = roomFetch.data;
		setRoomData(currentRoom);
		//for now just fetch the first quiz
		const quizId = currentRoom.quizzes[0];
		const quizFetch = await axios.get(`${BASE_URL}/quiz/${quizId}`);
		const currentQuiz = quizFetch.data;
		setQuizData(currentQuiz);
	}

	function joinRoom(roomData) {
		console.log('New room data set by join');
		setRoomData(roomData);
	}

	const value = { createRoom, createQuiz, roomData, quizData, joinRoom, fetchRoomData };
	return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}
