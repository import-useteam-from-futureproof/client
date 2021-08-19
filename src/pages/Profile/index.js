import React, { useState } from 'react';
import { DeleteAccountModal } from '../../components';
import { NavBar } from '../../components';
import { useAuth } from '../../contexts/AuthContext';

import styles from './style.module.css';

export default () => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const handleDeleteClick = () => {
		setShowDeleteModal((prevState) => !prevState);
	};

	const closeDeleteAccountModal = () => {
		setShowDeleteModal(false);
	};

	const { currentUser } = useAuth();

	return (
		<>
			<DeleteAccountModal closeModal={closeDeleteAccountModal} isVisible={showDeleteModal} />
			<NavBar />
			<main>
				<h1 className={styles.welcomeHeader}>
					Hello {currentUser ? currentUser.displayName : 'Profile'}
				</h1>
				<button
					className={styles.button}
					aria-label="access delete account button"
					onClick={handleDeleteClick}
				>
					Delete Account
				</button>
			</main>
		</>
	);
};
