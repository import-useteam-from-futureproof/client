import React, { useState } from 'react';
import { DeleteAccountModal } from '../../components';
import { NavBar } from '../../components';

export default () => {
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const handleDeleteClick = () => {
		setShowDeleteModal((prevState) => !prevState);
	};

	const closeDeleteAccountModal = () => {
		setShowDeleteModal(false);
	};

	return (
		<>
			<DeleteAccountModal closeModal={closeDeleteAccountModal} isVisible={showDeleteModal} />
			<NavBar />
			<main>
				<h1>Hello Profile</h1>
				<button aria-label="access delete account button" onClick={handleDeleteClick}>
					Delete Account
				</button>
			</main>
		</>
	);
};
