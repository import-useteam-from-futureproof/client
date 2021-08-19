import React, { useState } from 'react';
import styles from './style.module.css';
import { useAuth } from '../../contexts/AuthContext';

export default ({ isVisible, closeModal }) => {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [error, setError] = useState('');

	const { currentUser, authenticateUser, updatePassword } = useAuth();

	const handlePasswordInputChange = (e) => {
		setPassword(e.target.value);
	};

	const handlePasswordConfirmInputChange = (e) => {
		setConfirmPassword(e.target.value);
	};

	const handleOriginalPasswordInputChange = (e) => {
		setCurrentPassword(e.target.value);
	};

	const modalStyle = {
		opacity: isVisible ? 1 : 0,
		pointerEvents: isVisible ? 'all' : 'none',
	};

	const handleUpdatePassword = async () => {
		try {
			setError('');
			if (password !== confirmPassword) {
				handleError({ code: "passwords don't match" });
			}
			if (error === '') {
				await authenticateUser(currentUser.email, currentPassword);
				await updatePassword(password);
				closeModal();
			}
		} catch (err) {
			handleError(err);
		}
	};

	const handleError = (error) => {
		let displayedError;
		switch (error.code) {
			case "passwords don't match":
				displayedError = "Passwords don't match.";
				break;
			case 'auth/wrong-password':
				displayedError = 'Current Password is incorrect';
				break;
			default:
				displayedError = 'Change password error. Please try again.';
				break;
		}

		setError(displayedError);
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
						Current Password:{' '}
						<input
							onChange={handleOriginalPasswordInputChange}
							value={currentPassword}
							id="profileOriginalPassword"
							type="password"
							placeholder="current password"
						/>
					</label>
					<br></br>
					<br></br>
					<label className={styles.inputFields}>
						New Password:{' '}
						<input
							onChange={handlePasswordInputChange}
							value={password}
							id="profilePassword"
							type="password"
							placeholder="new password"
						/>
					</label>
					<br></br>
					<br></br>
					<label className={styles.inputFields}>
						Confirm Password:{' '}
						<input
							onChange={handlePasswordConfirmInputChange}
							value={confirmPassword}
							id="profileConfirmPassword"
							type="password"
							placeholder="confirm password"
						/>
					</label>
				</form>
				<p className={styles.errorDisplay}>{error}</p>
				<button
					className={styles.button}
					onClick={handleUpdatePassword}
					aria-label="delete account"
				>
					Change Password
				</button>
			</div>
		</section>
	);
};
