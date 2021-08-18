import React, { useState } from 'react';
import styles from './style.module.css';

export default ({ onSubmit }) => {
	const [formData, setFormData] = useState({
		roomName: '',
		maxPlayers: 4,
		public: true,
		password: null,
	});

	const handleTextInputChange = (e) => {
		setFormData((prevState) => {
			return { ...prevState, [e.target.id]: e.target.value };
		});
	};

	const handleCheckboxChange = (e) => {
		setFormData((prevState) => {
			return {
				...prevState,
				[e.target.id]: !e.target.checked,
				password: e.target.checked ? '' : null,
			};
		});
	};

	const handleMaxPlayersChange = (e) => {
		const { value } = e.target;
		if (value !== '' && (value > 10 || value < 1)) {
			return;
		}
		setFormData((prevState) => {
			return { ...prevState, [e.target.id]: e.target.value };
		});
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form className={styles.gameDisplay} onSubmit={handleFormSubmit}>
			<label htmlFor="roomName">Room Name</label>
			<input
				onChange={handleTextInputChange}
				value={formData.roomName}
				id="roomName"
				name="roomName"
				type="text"
				required
			/>

			<label htmlFor="maxPlayers">Number of players</label>
			<input
				onChange={handleMaxPlayersChange}
				value={formData.maxPlayers}
				id="maxPlayers"
				name="maxPlayers"
				type="number"
				min={1}
				max={10}
				required
			/>

			<input type="submit" />

			<label htmlFor="public">Private</label>
			<input onChange={handleCheckboxChange} id="public" name="public" type="checkbox" />

			{formData.public ? null : (
				<>
					<label htmlFor="password">Room Password</label>
					<input
						onChange={handleTextInputChange}
						value={formData.password}
						id="password"
						name="password"
						type="text"
						required
					/>
				</>
			)}
		</form>
	);
};
