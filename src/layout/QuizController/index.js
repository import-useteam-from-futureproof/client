import React, { useState } from 'react';
import { LobbyWaitingRoom, Game, Results } from '../../components';

const QuizController = () => {
	const handleGameEnd = (answers) => {
		console.log(answers);
	};

	return (
		<>
			<Game onGameEnd={handleGameEnd} />
			<LobbyWaitingRoom />
			<Results />
		</>
	);
};

export default QuizController;
