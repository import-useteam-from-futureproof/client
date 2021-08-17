import React from 'react';
import { NavBar } from '../../components';
import { RoomList, NewQuiz } from '../../layout';
import { useAuth } from '../../contexts/AuthContext';

export default () => {
	const { currentUser } = useAuth();
	return (
		<>
			<NavBar />
			<main>
				<h1>Hello {currentUser ? currentUser.displayName : null}</h1>
				<RoomList />
				<NewQuiz />
			</main>
		</>
	);
};
