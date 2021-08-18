import React, { useState } from 'react';
import { LobbyWaitingRoom, Game, Results } from '../../components';

const QuizController = () => {
	const handleGameEnd = (answers) => {
		console.log(answers);
	};

	const handleHostStart = () => {
		console.log('Quiz Started');
	};

	return (
		<>
			<Game onGameEnd={handleGameEnd} />
			<LobbyWaitingRoom hostStartedQuiz={handleHostStart} />
			<Results />
		</>
	);
};

export default QuizController;
