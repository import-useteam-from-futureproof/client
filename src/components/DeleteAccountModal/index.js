import React, { useState } from 'react';
import styles from './style.module.css';
import { useAuth } from '../../contexts/AuthContext';

export default ({ isVisible, closeModal }) => {
	const [currentPassword, setCurrentPassword] = useState('');
	const [error, setError] = useState('');
	const { currentUser, authenticateUser, deleteAccount } = useAuth();

	const modalStyle = {
		opacity: isVisible ? 1 : 0,
		pointerEvents: isVisible ? 'all' : 'none',
	};

	const handleOriginalPasswordInputChange = (e) => {
		setCurrentPassword(e.target.value);
	};

	const handleDeleteAcount = async () => {
		try {
			await authenticateUser(currentUser.email, currentPassword);
			await deleteAccount();
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
		<section style={modalStyle} className={styles.deleteAccountModal}>
			<div role="presentation">
				<button className={styles.buttonClose} onClick={closeModal}>
					&times;
				</button>
				<p>Are you sure you want to delete your account?</p>
				<p aria-label="warning message" className={styles.warning}>
					THIS ACTION IS IRREVERSIBLE
				</p>
				<form>
					<label className={styles.inputFields}>
						Current Password:{' '}
						<input
							onChange={handleOriginalPasswordInputChange}
							value={currentPassword}
							id="deleteCurrentPassword"
							type="password"
							placeholder="current password"
						/>
					</label>
				</form>
				<p className={styles.errorDisplay}>{error}</p>
				<button className={styles.button} onClick={handleDeleteAcount} aria-label="delete account">
					Delete Account
				</button>
			</div>
		</section>
	);
};
