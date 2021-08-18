import React, { useState } from 'react';
import { LobbyWaitingRoom, Game, Results } from '../../components';

const QuizController = () => {
	return (
		<>
			<Game />
			<LobbyWaitingRoom />
			<Results />
		</>
	);
};

export default QuizController;
