import React, { useState } from 'react';
import styles from './style.module.css';
import { useAuth } from '../../contexts/AuthContext';

export default ({ displayName, isVisible, closeModal }) => {
	const [username, setUsername] = useState(displayName);
	const [denyUpdate, setDenyUpdate] = useState(true);

	const { currentUser, updateUsername } = useAuth();

	const handleUsernameInputChange = (e) => {
		setUsername(e.target.value);
		if (e.target.value === displayName) {
			setDenyUpdate(true);
		} else {
			setDenyUpdate(false);
		}
	};

	const modalStyle = {
		opacity: isVisible ? 1 : 0,
		pointerEvents: isVisible ? 'all' : 'none',
	};

	const handleUpdateUsername = async () => {
		try {
			await updateUsername(username);
			setUsername(username);
			closeModal();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<section style={modalStyle} className={styles.updateUsernameModal}>
			<div role="presentation">
				<button className={styles.buttonClose} onClick={closeModal}>
					&times;
				</button>
				<br></br>
				<form>
					<label className={styles.inputFields}>
						Username:{' '}
						<input
							onChange={handleUsernameInputChange}
							value={username}
							id="username"
							type="text"
						/>
					</label>
				</form>
				<button
					className={styles.button}
					onClick={handleUpdateUsername}
					aria-label="update username"
					disabled={denyUpdate}
				>
					Update Username
				</button>
			</div>
		</section>
	);
};
