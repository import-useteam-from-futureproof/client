import React, { useState } from 'react';
import styles from './style.module.css';
import { useAuth } from '../../contexts/AuthContext';

export default ({ isVisible, closeModal }) => {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const { updateUsername } = useAuth();

	const handlePasswordInputChange = (e) => {
		setPassword(e.target.value);
	};

	const handlePasswordConfirmInputChange = (e) => {
		setConfirmPassword(e.target.value);
	};

	const modalStyle = {
		opacity: isVisible ? 1 : 0,
		pointerEvents: isVisible ? 'all' : 'none',
	};

	const handleDeleteAcount = async () => {
		try {
			if (password !== confirmPassword) {
				alert('Passwords do not match');
			}
			await updatePassword(password);
			closeModal();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<section style={modalStyle} className={styles.updatePasswordModal}>
			<div role="presentation">
				<button className={styles.buttonClose} onClick={closeModal}>
					&times;
				</button>
				<br></br>
				<br></br>
				<form>
					<label className={styles.inputFields}>
						New Password:{' '}
						<input
							onChange={handlePasswordInputChange}
							value={password}
							id="profilePassword"
							type="password"
							placeholder="password"
						/>
					</label>
					<br></br>
					<br></br>
					<label className={styles.inputFields}>
						Confirm Password:{' '}
						<input
							onChange={handlePasswordConfirmInputChange}
							value={password}
							id="profileConfirmPassword"
							type="password"
							placeholder="confirm password"
						/>
					</label>
				</form>
				<button className={styles.button} onClick={handleDeleteAcount} aria-label="delete account">
					Change Password
				</button>
			</div>
		</section>
	);
};
