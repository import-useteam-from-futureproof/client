import React from 'react';
import { Chatroom, NavBar } from '../../components';
import { QuizController } from '../../layout';

export default () => {
	return (
		<main>
			<NavBar />
			<Chatroom />;
			<QuizController />;
		</main>
	);
};
