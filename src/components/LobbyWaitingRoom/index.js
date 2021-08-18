import React, { useState, useEffect } from 'react';
import { useQuiz } from '../../contexts/QuizContext';
import { useAuth } from '../../contexts/AuthContext';

const LobbyWaitingRoom = () => {
	const [host, setHostBool] = useState(false);
	const { roomData } = useQuiz();
	const { currentUser } = useAuth();

	useEffect(() => {
		if (roomData.owner === currentUser.uid) {
			setHostBool(true);
		}
	}, []);

	const renderHostPage = () => {
		return (
			<form>
				<h1>You are the host</h1>
				<input type="submit" value="Start the quiz!"></input>
			</form>
		);
	};

	const renderParticipantPage = () => {
		return (
			<div>
				<h1>Waiting for the host to start the game..</h1>
			</div>
		);
	};

	return <>{host ? renderHostPage() : renderParticipantPage()}</>;
};

export default LobbyWaitingRoom;
