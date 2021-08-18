import React from 'react';
import styles from './style.module.css';
import { useAuth } from '../../contexts/AuthContext';

export default ({ isVisible, closeModal }) => {
	const { deleteAccount } = useAuth();

	const modalStyle = {
		opacity: isVisible ? 1 : 0,
		pointerEvents: isVisible ? 'all' : 'none',
	};

	const handleDeleteAcount = async () => {
		try {
			await deleteAccount();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<section style={modalStyle} className={styles.deleteAccountModal}>
			<div role="presentation">
				<button onClick={closeModal}>&times;</button>
				<p>Are you sure you want to delete your account?</p>
				<p aria-label="warning message" className={styles.warning}>
					THIS ACTION IS IRREVERSIBLE
				</p>
				<button onClick={handleDeleteAcount} aria-label="delete account">
					Delete Account
				</button>
			</div>
		</section>
	);
};
